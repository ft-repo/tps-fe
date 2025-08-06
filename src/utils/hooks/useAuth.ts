import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
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
import type { SignInCredential, SignUpCredential } from '@/@types/auth'

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
							resp.data.details || {
								id: '',
								registration_no: '',
								business_details: {
									entity_type_id: 0,
									business_name: '',
									entity_type: {
										id: 0,
										name: '',
									},
								},
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
							resp.data.details || {
								id: '',
								registration_no: '',
								business_details: {
									entity_type_id: 0,
									business_name: '',
									entity_type: {
										id: 0,
										name: '',
									},
								},
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
				registration_no: '',
				business_details: {
					entity_type_id: 0,
					business_name: '',
					entity_type: {
						id: 0,
						name: '',
					},
				},
			}),
		)
		navigate(appConfig.unAuthenticatedEntryPath)
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
	}
}

export default useAuth
