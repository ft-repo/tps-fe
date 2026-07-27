import { describe, it, expect } from 'vitest'
import userReducer, { setUser, UserState } from '@/store/slices/auth/userSlice'

const emptyUser: UserState = {
    id: '',
    userName: '',
    name: '',
    profile_url: '',
    details: {
        id: '',
        registration_no: '',
        created_at: '',
        profile_url: '',
        is_personal: false,
        business_details: { entity_type_id: 0, business_name: '', entity_type: { id: 0, name: '' } },
        business_address: {
            house_number: '', village: '', lane: '', road: '',
            sub_district_id: 0, district_id: 0, zip_codes: '', province_id: 0, phone_number: '',
            province: { id: 0, name_th: '', name_en: '' },
            district: { id: 0, name_th: '', name_en: '', province_id: 0 },
            sub_district: { id: 0, name_th: '', name_en: '', zip_code: '', province_id: 0, district_id: 0 },
        },
        contact_info: { contact_name: '', contact_type_id: 0, phone_number: '', cid: '', contact_type: { id: 0, name: '' } },
        department: { dept_name: '', dept_type: 0, dept_group: 0, dept_province: '' },
        role: { name: '' },
    },
    authority: [],
}

describe('userSlice', () => {
    it('has correct initial state (all empty)', () => {
        expect(userReducer(undefined, { type: '@@INIT' })).toEqual(emptyUser)
    })

    it('setUser populates all top-level fields', () => {
        const payload = {
            id: 'user-1',
            userName: 'por_nee',
            name: 'Por Nee',
            profile_url: '/profile.jpg',
            details: emptyUser.details,
            authority: ['ENTREPRENEUR'],
        }
        const state = userReducer(emptyUser, setUser(payload))
        expect(state.id).toBe('user-1')
        expect(state.userName).toBe('por_nee')
        expect(state.name).toBe('Por Nee')
        expect(state.authority).toEqual(['ENTREPRENEUR'])
    })

    it('setUser replaces existing user data', () => {
        const first = userReducer(emptyUser, setUser({ ...emptyUser, id: 'old-id', authority: ['STAFF'] }))
        const second = userReducer(first, setUser({ ...emptyUser, id: 'new-id', authority: ['ADMIN'] }))
        expect(second.id).toBe('new-id')
        expect(second.authority).toEqual(['ADMIN'])
    })
})
