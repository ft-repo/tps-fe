import { describe, it, expect, vi } from 'vitest'
import {
    parseAuthSnapshot,
    serializeAuthSnapshot,
    roleFromAuthority,
    snapshotFromPersistBlob,
    createLocalStorageAuthStorage,
    createMemoryAuthStorage,
    EMPTY_SNAPSHOT,
    AUTH_STORAGE_KEY,
} from '@/lib/auth/authStorage'

const NOW = 1_700_000_000_000

function makeFakeStorage() {
    const map = new Map<string, string>()
    return {
        getItem: (key: string) => map.get(key) ?? null,
        setItem: (key: string, value: string) => {
            map.set(key, value)
        },
        removeItem: (key: string) => {
            map.delete(key)
        },
    }
}

function makeFakeTarget() {
    const handlers: Array<(event: Event) => void> = []
    return {
        addEventListener: (_type: string, handler: EventListener) => {
            handlers.push(handler)
        },
        removeEventListener: (_type: string, handler: EventListener) => {
            const i = handlers.indexOf(handler)
            if (i >= 0) handlers.splice(i, 1)
        },
        fire(event: Partial<StorageEvent> & { key: string | null }) {
            handlers.forEach((h) => h(event as StorageEvent))
        },
    }
}

describe('parseAuthSnapshot', () => {
    it.each([null, undefined, '', 'garbage', '{}', '{"role":"admin"}'])(
        'returns EMPTY_SNAPSHOT for %p without throwing',
        (raw) => {
            expect(() => parseAuthSnapshot(raw as never)).not.toThrow()
            expect(parseAuthSnapshot(raw as never)).toEqual(EMPTY_SNAPSHOT)
        },
    )

    it('parses a full, well-formed snapshot', () => {
        const snapshot = {
            accessToken: 'at',
            refreshToken: 'rt',
            refreshAt: 123,
            role: 'admin' as const,
            rev: 4,
        }
        expect(parseAuthSnapshot(serializeAuthSnapshot(snapshot))).toEqual(snapshot)
    })

    it('drops a bogus role instead of trusting it', () => {
        const raw = JSON.stringify({ accessToken: 'at', role: 'ROOT', rev: 1 })
        expect(parseAuthSnapshot(raw).role).toBeNull()
    })

    it('defaults refreshAt and rev when missing or non-numeric', () => {
        const raw = JSON.stringify({ accessToken: 'at', refreshAt: '123', rev: '4' })
        const result = parseAuthSnapshot(raw)
        expect(result.refreshAt).toBe(0)
        expect(result.rev).toBe(0)
    })
})

describe('roleFromAuthority', () => {
    it("maps ['ADMIN'] to 'admin'", () => {
        expect(roleFromAuthority(['ADMIN'])).toBe('admin')
    })

    it("maps ['USER'] to 'client'", () => {
        expect(roleFromAuthority(['USER'])).toBe('client')
    })

    it('maps empty/null/undefined to null', () => {
        expect(roleFromAuthority([])).toBeNull()
        expect(roleFromAuthority(null)).toBeNull()
        expect(roleFromAuthority(undefined)).toBeNull()
    })
})

describe('snapshotFromPersistBlob (migration seed)', () => {
    it('builds a snapshot from a realistic double-stringified redux-persist blob', () => {
        const blob = JSON.stringify({
            auth: JSON.stringify({
                session: JSON.stringify({ signedIn: true, token: 'legacy-access-token' }),
                user: JSON.stringify({ authority: ['USER'] }),
            }),
            locale: '"th"',
        })
        const result = snapshotFromPersistBlob(blob, NOW)
        expect(result.accessToken).toBe('legacy-access-token')
        expect(result.refreshToken).toBeNull()
        expect(result.role).toBe('client')
        expect(result.refreshAt).toBeGreaterThan(NOW)
    })

    it('returns EMPTY_SNAPSHOT for null/empty/garbage input', () => {
        expect(snapshotFromPersistBlob(null, NOW)).toEqual(EMPTY_SNAPSHOT)
        expect(snapshotFromPersistBlob('', NOW)).toEqual(EMPTY_SNAPSHOT)
        expect(snapshotFromPersistBlob('not json', NOW)).toEqual(EMPTY_SNAPSHOT)
    })

    it('returns EMPTY_SNAPSHOT when there is no session token', () => {
        const blob = JSON.stringify({ auth: JSON.stringify({ user: JSON.stringify({}) }) })
        expect(snapshotFromPersistBlob(blob, NOW)).toEqual(EMPTY_SNAPSHOT)
    })
})

describe('createLocalStorageAuthStorage', () => {
    it('read() returns EMPTY_SNAPSHOT when nothing is stored', () => {
        const storage = createLocalStorageAuthStorage({ storage: makeFakeStorage() })
        expect(storage.read()).toEqual(EMPTY_SNAPSHOT)
    })

    it('write() then read() round-trips and bumps rev', () => {
        const storage = createLocalStorageAuthStorage({ storage: makeFakeStorage() })
        const first = storage.write({ accessToken: 'a1', refreshToken: 'r1', refreshAt: 1, role: 'client' })
        expect(first.rev).toBe(1)
        expect(storage.read()).toEqual(first)
        const second = storage.write({ accessToken: 'a2', refreshToken: 'r2', refreshAt: 2, role: 'client' })
        expect(second.rev).toBe(2)
    })

    it('CAS: a write with a stale expectedRev is dropped, winning snapshot returned', () => {
        const storage = createLocalStorageAuthStorage({ storage: makeFakeStorage() })
        const first = storage.write({ accessToken: 'a1', refreshToken: 'r1', refreshAt: 1, role: 'client' })
        // Someone else writes in between (rev now 2)
        storage.write({ accessToken: 'a2', refreshToken: 'r2', refreshAt: 2, role: 'client' })
        // Stale writer still thinks rev is 1 -> loses
        const result = storage.write(
            { accessToken: 'stale', refreshToken: 'stale', refreshAt: 3, role: 'client' },
            first.rev,
        )
        expect(result.accessToken).toBe('a2')
        expect(storage.read().accessToken).toBe('a2')
    })

    it('CAS: a write with the current expectedRev succeeds', () => {
        const storage = createLocalStorageAuthStorage({ storage: makeFakeStorage() })
        const first = storage.write({ accessToken: 'a1', refreshToken: 'r1', refreshAt: 1, role: 'client' })
        const result = storage.write(
            { accessToken: 'a2', refreshToken: 'r2', refreshAt: 2, role: 'client' },
            first.rev,
        )
        expect(result.accessToken).toBe('a2')
        expect(result.rev).toBe(2)
    })

    it('clear() removes the stored value', () => {
        const storage = createLocalStorageAuthStorage({ storage: makeFakeStorage() })
        storage.write({ accessToken: 'a1', refreshToken: 'r1', refreshAt: 1, role: 'client' })
        storage.clear()
        expect(storage.read()).toEqual(EMPTY_SNAPSHOT)
    })

    it('caches by exact raw string (does not re-parse identical reads)', () => {
        const backing = makeFakeStorage()
        const storage = createLocalStorageAuthStorage({ storage: backing })
        storage.write({ accessToken: 'a1', refreshToken: 'r1', refreshAt: 1, role: 'client' })
        const first = storage.read()
        const second = storage.read()
        expect(second).toBe(first) // same object reference => cache hit
    })

    describe('subscribe (cross-tab)', () => {
        it('ignores storage events for a different key', () => {
            const target = makeFakeTarget()
            const storage = createLocalStorageAuthStorage({ storage: makeFakeStorage(), target })
            const listener = vi.fn()
            storage.subscribe(listener)
            target.fire({ key: 'some-other-key', newValue: 'x', oldValue: null })
            expect(listener).not.toHaveBeenCalled()
        })

        it('ignores an event whose newValue equals oldValue', () => {
            const target = makeFakeTarget()
            const storage = createLocalStorageAuthStorage({ storage: makeFakeStorage(), target })
            const listener = vi.fn()
            storage.subscribe(listener)
            const raw = serializeAuthSnapshot({
                accessToken: 'a',
                refreshToken: 'r',
                refreshAt: 1,
                role: 'client',
                rev: 1,
            })
            target.fire({ key: AUTH_STORAGE_KEY, newValue: raw, oldValue: raw })
            expect(listener).not.toHaveBeenCalled()
        })

        it('drops an event whose rev is not newer than the last applied one', () => {
            const target = makeFakeTarget()
            const storage = createLocalStorageAuthStorage({ storage: makeFakeStorage(), target })
            const listener = vi.fn()
            storage.subscribe(listener)
            const rev2 = serializeAuthSnapshot({
                accessToken: 'a2',
                refreshToken: 'r2',
                refreshAt: 2,
                role: 'client',
                rev: 2,
            })
            target.fire({ key: AUTH_STORAGE_KEY, newValue: rev2, oldValue: null })
            expect(listener).toHaveBeenCalledTimes(1)

            const staleRev1 = serializeAuthSnapshot({
                accessToken: 'a1',
                refreshToken: 'r1',
                refreshAt: 1,
                role: 'client',
                rev: 1,
            })
            target.fire({ key: AUTH_STORAGE_KEY, newValue: staleRev1, oldValue: rev2 })
            expect(listener).toHaveBeenCalledTimes(1) // still 1 — stale event dropped
        })

        it('propagates a newer snapshot', () => {
            const target = makeFakeTarget()
            const storage = createLocalStorageAuthStorage({ storage: makeFakeStorage(), target })
            const listener = vi.fn()
            storage.subscribe(listener)
            const raw = serializeAuthSnapshot({
                accessToken: 'a1',
                refreshToken: 'r1',
                refreshAt: 1,
                role: 'client',
                rev: 1,
            })
            target.fire({ key: AUTH_STORAGE_KEY, newValue: raw, oldValue: null })
            expect(listener).toHaveBeenCalledWith(
                expect.objectContaining({ accessToken: 'a1', rev: 1 }),
            )
        })

        it('propagates EMPTY_SNAPSHOT for an explicit clear (newValue null)', () => {
            const target = makeFakeTarget()
            const storage = createLocalStorageAuthStorage({ storage: makeFakeStorage(), target })
            const listener = vi.fn()
            storage.subscribe(listener)
            target.fire({ key: AUTH_STORAGE_KEY, newValue: null, oldValue: 'anything' })
            expect(listener).toHaveBeenCalledWith(EMPTY_SNAPSHOT)
        })

        it('unsubscribe stops further notifications', () => {
            const target = makeFakeTarget()
            const storage = createLocalStorageAuthStorage({ storage: makeFakeStorage(), target })
            const listener = vi.fn()
            const unsubscribe = storage.subscribe(listener)
            unsubscribe()
            const raw = serializeAuthSnapshot({
                accessToken: 'a1',
                refreshToken: 'r1',
                refreshAt: 1,
                role: 'client',
                rev: 1,
            })
            target.fire({ key: AUTH_STORAGE_KEY, newValue: raw, oldValue: null })
            expect(listener).not.toHaveBeenCalled()
        })
    })

    it('read() never throws when the underlying storage.getItem throws', () => {
        const throwingStorage = {
            getItem: () => {
                throw new Error('SecurityError')
            },
            setItem: () => undefined,
            removeItem: () => undefined,
        }
        const storage = createLocalStorageAuthStorage({ storage: throwingStorage })
        expect(() => storage.read()).not.toThrow()
        expect(storage.read()).toEqual(EMPTY_SNAPSHOT)
    })
})

describe('createMemoryAuthStorage', () => {
    it('starts empty by default', () => {
        expect(createMemoryAuthStorage().read()).toEqual(EMPTY_SNAPSHOT)
    })

    it('can seed an initial snapshot', () => {
        const storage = createMemoryAuthStorage({ accessToken: 'seed', rev: 5 })
        expect(storage.read().accessToken).toBe('seed')
        expect(storage.read().rev).toBe(5)
    })

    it('write() bumps rev and CAS behaves like the localStorage variant', () => {
        const storage = createMemoryAuthStorage()
        const first = storage.write({ accessToken: 'a1', refreshToken: 'r1', refreshAt: 1, role: 'client' })
        const rejected = storage.write(
            { accessToken: 'stale', refreshToken: 'stale', refreshAt: 2, role: 'client' },
            0,
        )
        expect(rejected).toEqual(first)
    })

    it('clear() resets to EMPTY_SNAPSHOT', () => {
        const storage = createMemoryAuthStorage({ accessToken: 'a' })
        storage.clear()
        expect(storage.read()).toEqual(EMPTY_SNAPSHOT)
    })

    it('does not self-notify subscribers on write (mirrors real storage events)', () => {
        const storage = createMemoryAuthStorage()
        const listener = vi.fn()
        storage.subscribe(listener)
        storage.write({ accessToken: 'a1', refreshToken: 'r1', refreshAt: 1, role: 'client' })
        expect(listener).not.toHaveBeenCalled()
    })
})
