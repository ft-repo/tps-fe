import { apiSignIn, apiSignInStaff, apiSignUp } from '@/services/AuthService'
import {
	setUser,
	signInSuccess,
	signOutSuccess,
	useAppSelector,
	useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignInStaffCredential, SignUpCredential } from '@/@types/auth'

type Status = 'success' | 'failed'

function useAuth() {
	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const query = useQuery()

	const { token, signedIn } = useAppSelector((state) => state.auth.session)

	const signIn = async (
		values: SignInCredential,
	): Promise<
		| {
			status: Status
			message: string
		}
		| undefined
	> => {
		try {
			const resp = await apiSignIn(values)
			if (resp.data) {
				const { access_token } = resp.data
				dispatch(signInSuccess(access_token))
				if (resp.data.details) {
					dispatch(
						setUser(
							{
								id: resp.data.details.id,
								userName: resp.data.details.registration_no,
								name: resp.data.details.business_details.business_name,
								profile_url: resp.data.details.profile_url,
								details: { ...resp.data.details },
								authority: ['USER'],
							},
						),
					)
				}
				const redirectUrl = query.get(REDIRECT_URL_KEY)
				navigate(
					redirectUrl
						? redirectUrl
						: appConfig.authenticatedEntryPath,
				)
				return {
					status: 'success',
					message: '',
				}
			}
			// eslint-disable-next-line  @typescript-eslint/no-explicit-any
		} catch (errors: any) {
			console.log(errors)
			return {
				status: 'failed',
				message: errors?.response?.data?.res_data?.message || errors.toString(),
			}
		}
	}

	const signUp = async (values: SignUpCredential) => {
		try {
			const resp = await apiSignUp(values)
			if (resp.data) {
				const { access_token } = resp.data
				dispatch(signInSuccess(access_token))
				if (resp.data.details) {
					dispatch(
						setUser(
							{
								id: resp.data.details.id,
								userName: resp.data.details.registration_no,
								name: resp.data.details.business_details.business_name,
								details: { ...resp.data.details },
								authority: ['USER'],
							},
						),
					)
				}
				const redirectUrl = query.get(REDIRECT_URL_KEY)

				setTimeout(() => {
					navigate(
						redirectUrl
							? redirectUrl
							: appConfig.authenticatedEntryPath,
					)
				}, 3000)
				return {
					status: 'success',
					message: '',
				}
			}
			// eslint-disable-next-line  @typescript-eslint/no-explicit-any
		} catch (errors: any) {
			return {
				status: 'failed',
				message: errors?.response?.data?.res_data?.message || errors.toString(),
			}
		}
	}

	const handleSignOut = () => {
		dispatch(signOutSuccess())
		dispatch(
			setUser({
				id: '',
				userName: '',
				name: '',
				details: {
					department: undefined,
					role: undefined,
					entity_type: undefined,
				},
				authority: [],
			}),
		)
		navigate(appConfig.unAuthenticatedEntryPath)
	}

	const signInStaff = async (values: SignInStaffCredential) => {
		try {
			const resp = await apiSignInStaff(values)
			if (resp.data) {
				const { access_token } = resp.data
				dispatch(signInSuccess(access_token))
				if (resp.data.details) {
					dispatch(
						setUser(
							{
								id: resp.data.details.id,
								userName: resp.data.details.username,
								name: resp.data.details.title + ' ' + resp.data.details.first_name + ' ' + resp.data.details.last_name,
								details: {
									department: {
										dept_name: resp.data.details.department.dept_name,
										dept_type: resp.data.details.department.dept_type,
										dept_group: resp.data.details.department.dept_group,
										dept_province: resp.data.details.department.dept_province,
									},
									role: {
										name: resp.data.details.role.name,
									},
								},
								authority: ['ADMIN'],
							},
						),
					)
				}
				const redirectUrl = query.get(REDIRECT_URL_KEY)
				navigate(
					redirectUrl
						? redirectUrl
						: appConfig.authenticatedAdminEntryPath,
				)
				return {
					status: 'success',
					message: '',
				}
			}
		} catch (errors: any) {
			return {
				status: 'failed',
				message: errors?.response?.data?.res_data?.message || errors.toString(),
			}
		}
	}

	const signOut = async () => {
		// await apiSignOut()
		handleSignOut()
	}

	return {
		authenticated: token && signedIn,
		signIn,
		signUp,
		signOut,
		signInStaff,
	}
}

export default useAuth
