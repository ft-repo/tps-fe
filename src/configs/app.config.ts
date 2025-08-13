export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    authenticatedAdminEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/api/v1/',
    authenticatedEntryPath: '/route-estimation/route',
    authenticatedAdminEntryPath: '/request-list/overview',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
