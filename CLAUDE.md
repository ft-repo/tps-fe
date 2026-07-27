# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

TPS-FE ("elstar") is a React 19 + TypeScript admin portal built on the Elstar admin template. It serves two user roles from one app: **entrepreneur** (vehicle/permit/route-estimation requests) and **staff** (approval, tracking, user management). Role-based access is enforced via route `authority` (`USER` vs `ADMIN`).

## Commands

```bash
npm run start          # vite dev server
npm run start:host      # vite dev server, exposed on network
npm run build            # production build -> ./build
npm run preview           # preview production build

npm run lint              # eslint src (.ts/.tsx)
npm run lint:fix
npm run prettier          # check formatting under src
npm run prettier:fix
npm run format             # prettier:fix then lint:fix

npm run test               # vitest run (writes JSON/HTML reports to ./claude-capture)
npm run test:watch          # vitest watch mode
npm run test:coverage        # vitest run with v8 coverage (./claude-capture/coverage)

./run_tsc.bat              # standalone `tsc --noEmit` type check (Windows batch script)
```

Run a single test file: `npx vitest run src/test/utils/shadeColor.test.ts`
Run tests matching a name: `npx vitest run -t "setDirection"`

There is no `typecheck` npm script — use `run_tsc.bat` (or `npx tsc --noEmit` directly) to type-check.

Test output (JSON/HTML/coverage) is written to `./claude-capture/`, which is gitignored/untracked — treat it as disposable build output, not source.

## Architecture

### views/ vs features/ split

This is the most important structural convention in the codebase. Each screen is split across two parallel trees:

- **`src/views/<role>/<module>/...`** — the routed entry point (what `routes.config.ts` lazy-imports). Thin wrapper: sets up `ConfigProvider`/theme, dispatches initial data-loading thunks (e.g. master data lookups), then renders the real screen from `features/`.
- **`src/features/<role>/<module>/screen/`** and **`.../components/`** — the actual screen implementation and its child components.

When asked to modify a "page", check both `views/.../index.tsx` (wiring/initial dispatches) and `features/.../screen/index.tsx` (actual UI/logic) — the feature is usually where the real work happens.

### Routing

- `src/configs/routes.config/routes.config.ts` is the single source of truth for all routes: `publicRoutes` (auth pages) and `protectedRoutes` (everything else), each entry `{ key, path, component: lazy(...), authority: ['USER'|'ADMIN'], meta? }`.
- `src/components/route/ProtectedRoute.tsx` gates on authentication (`useAuth`), redirecting to `unAuthenticatedEntryPath` (from `configs/app.config.ts`) when not logged in.
- `src/components/route/AuthorityGuard.tsx` gates on role (`useAuthority`), redirecting to `/access-denied` on mismatch.
- `src/components/route/AppRoute.tsx` wraps each routed component to sync the active layout type into the theme store per-route.
- Routes currently mix `authority: ['USER']` (entrepreneur) and `['ADMIN']` (staff) — some entrepreneur routes are temporarily reachable under `USER` pending a separate staff-login rollout (see comments in `routes.config.ts`).

### State management

- Redux Toolkit store (`src/store/`), persisted via `redux-persist` (localStorage), but **only `auth` and `locale` slices are whitelisted for persistence** (`storeSetup.ts`) — don't assume other slices survive a refresh.
- `rootReducer.ts` combines slices per domain: `auth`, `base`, `locale`, `theme`, `master`, `entrepreneur`, `layout`, `staff`, `routeDirection`, `tracking`, plus the RTK Query reducer.
- Slices are organized by domain under `src/store/slices/<domain>/`, each with an `index.ts` barrel export and often a `constants.ts`.
- Two parallel API patterns exist:
  - **Axios + thunks** (`src/services/ApiService.ts` → `BaseService.ts` axios instance) — most domain services (`services/entrepreneur/*`, `services/staff/*`, `services/master/*`) and slices use this, wiring results through `createAsyncThunk`.
  - **RTK Query** (`src/services/RtkQueryService.ts`) — an axios-based `baseQuery` wrapping the same `BaseService` instance; `rootReducer` mounts it at `RtkQueryService.reducerPath`. New endpoints should inject into this API rather than adding another axios thunk if RTK Query's caching is useful.
- `BaseService.ts` (axios instance) attaches the current access token (via `sessionManagerInstance`) and an optional `VITE_API_KEY` header on every request, and on any auth challenge (401, or `res_code` 40100/40199) silently refreshes and retries once before failing — see "Authentication and token refresh" below.

### Authentication and token refresh

Ported from the `drr-new-its-fe` Next.js reference implementation, adapted for a pure SPA with no BFF (there's no server runtime to hide the refresh token behind an httpOnly cookie, so it lives in browser storage instead).

- **Two storage locations, deliberately split:**
  - `localStorage['admin']` — the redux-persist blob, `auth.session.token` mirrors the current access token for UI reads (PDF viewer `httpHeaders`, `useAuth`'s `state.auth.session`, etc.).
  - `localStorage['tps.auth.v1']` — the actual source of truth (`src/lib/auth/authStorage.ts`, `AuthSnapshot = { accessToken, refreshToken, refreshAt, role, rev }`), written synchronously with a compare-and-swap on `rev`. The refresh token lives **only** here — never in Redux, never in devtools. Redux-persist's async batched writes would make the rotation-race window flaky if the refresh token lived there instead, and its wholesale-replace-on-rehydrate reconciler would hand new `SessionState` fields back as `undefined`.
- **`src/lib/auth/sessionManager.ts`** (`createSessionManager(deps)`) is the stateful coordinator — all state lives in one closure, so tests get a virgin instance by calling the factory again. Implements: proactive refresh once past `refreshAt` (`refreshSchedule.ts`, JWT `exp` − 3min lead), reactive refresh on any auth challenge (`refreshPolicy.ts`'s `isAuthChallenge`/`classifyRefreshError`), in-tab single-flight (concurrent callers park behind one refresh), a cross-tab mutex (`refreshLock.ts`, `navigator.locks` with a 10s acquire timeout and passthrough fallback), a `[0,800,2000]ms` retry ladder, rotation-race recovery (checked before/during/after the retry loop), a self-re-arming background heartbeat (clamped to 10min, not one long `setTimeout`), cross-tab sync via `storage` events, and a one-time migration seed (`snapshotFromPersistBlob`) for sessions that predate this feature and have no refresh token yet.
- **`src/services/sessionManagerInstance.ts`** — the single production `SessionManager`, wired to real `localStorage`/`navigator.locks`/`apiRefresh`. Runs the migration seed at module load. Part of the pre-existing `store ↔ RtkQueryService ↔ BaseService` import cycle — only ever dereferences `store` inside callbacks, never at module-eval time.
- **`src/components/shared/SessionBootstrap.tsx`** — mounted inside `<PersistGate>` in `App.tsx`; starts/stops the coordinator's timer and cross-tab subscription (`start()`/`stop()` are idempotent, safe under StrictMode's double-invoke).
- **Auth endpoints are excluded** from refresh handling (`BaseService.ts`'s `AUTH_ENDPOINT_RE`: `{client,admin}/auth/{login,register,refresh}`, `/me/:token`) — tps-fe's login goes through this same axios instance, so without the guard a wrong password would trigger a refresh attempt instead of surfacing as a login failure.
- **`apiRefresh`** (`AuthService.ts`) posts to `/{client,admin}/auth/refresh` on a bare axios instance — deliberately not through `ApiService`/`BaseService`, which would re-enter the interceptors and deadlock.
- **Login/logout wiring** (`useAuth.ts`): all 4 login flows call `sessionManager.onLogin({ accessToken, refreshToken, role })` (`role` is `'client'` for entrepreneur flows, `'admin'` for staff); `handleSignOut` calls `sessionManager.onLogout()` then `clearAuthState(dispatch)` (`src/store/slices/auth/authActions.ts`) — the same reset function a session-manager-detected expiry uses, so both paths land in an identical signed-out state.
- **`sessionSlice`** has one refresh-specific action, `sessionTokenRefreshed`, dispatched by the coordinator after a silent refresh; `signInSuccess`/`SessionState` are unchanged.
- **Session-expired UX**: a `sessionStorage['tps.session_expired']` flag (set by `sessionManagerInstance`'s `onSessionExpired`) is read once on `SignIn`/`SignInStaff` mount and shown as a Thai toast — no hard page reload; `ProtectedRoute` redirects on its own once the auth state flips.
- Backend contract (client/admin both use `POST {baseURL}/{role}/auth/refresh`, body `{ refresh_token }`, no auth header required) is confirmed from `tps/bruno-collections`, but **whether the response rotates the refresh token is unverified** — no response bodies are recorded in any collection. `classifyRefreshError` treats a bare 4xx from the refresh call itself as definitive (not just `res_code 40100`) specifically to stay safe under that uncertainty.

### Path alias

`@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`) — always use `@/...` imports, not relative paths across feature/view boundaries.

### Mock API

`src/mock/` uses MirageJS (`mock/mock.ts`, `mock/fakeApi/`) and is only started when `appConfig.enableMock` is `true` (`configs/app.config.ts`) and `NODE_ENV !== 'production'` (wired in `src/App.tsx`). It's currently disabled by default — real requests go through the `/api/v1` proxy defined in `vite.config.ts` (proxied to `REACT_APP_API_HOST_BACKEND`).

### Layouts and theming

Multiple selectable layouts live in `src/components/layouts/` (Classic, Modern, Decked, StackedSide, Simple, Blank) and are switched via the `theme` slice's `layout.type`; `components/template/` holds the shared chrome (Header, SideNav, ThemeConfigurator, etc.) reused across layouts. Styling is Tailwind CSS v4 (`tailwind.config.cjs`, dark mode via `class`) layered with Ant Design components (`antd`, patched for React 19 via `@ant-design/v5-patch-for-react-19`) and DaisyUI.

### i18n

`src/locales/` with `i18next`/`react-i18next`; default locale is `th` (Thai) per `configs/app.config.ts`. UI font defaults to "Noto Sans Thai".

## Testing

- Vitest + `@testing-library/react`, jsdom environment, setup file `src/test/setup.ts` (imports `@testing-library/jest-dom`).
- Existing tests live under `src/test/` (not colocated with source), mirroring the source tree by directory: `test/store/` (slice reducer tests), `test/utils/` (pure utility tests), `test/lib/auth/` (the session-manager subsystem — pure logic plus the stateful coordinator, tested via dependency injection: a fake clock, in-memory `AuthStorage`, injected lock — no real timers, no `axios-mock-adapter`), and `test/services/` (`BaseService.ts`'s interceptors, tested against a custom axios `adapter` with `sessionManagerInstance` mocked via `vi.mock`). Follow this location convention for new tests rather than colocating `*.test.ts` next to source files.
- `src/test/lib/auth/harness.ts` holds shared, non-suite test helpers (`makeClock`, `makeDeps`, `makeJwt`, error fixtures) for the auth test bucket — not picked up as a suite itself since it doesn't match the `*.test.ts` glob.
- Coverage is scoped to `src/utils/**`, `src/store/slices/**`, `src/lib/**`, and the single file `src/services/BaseService.ts` (see `vitest.config.ts`) — deliberately not `src/services/**`, which would drag in many untested thunk-wrapper services and dilute the metric.
- Slice tests mock `@/configs/theme.config` and `@/constants/theme.constant` rather than importing real config, to isolate reducer logic (see `test/store/themeSlice.test.ts` for the pattern).

## Git workflow (from README)

- `main` — merge target only, don't work directly on it.
- `develop` — primary working branch.
- `features/...` — feature/module branches, merged into `develop`.
- `hotfixes/...` — targeted fixes for a specific feature/module.
- Commit prefixes: `feat:` (new files/functionality), `fix:` (fixes), `build:` (new/updated dependencies).
