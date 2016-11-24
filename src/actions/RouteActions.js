import RouteConstants from './RouteConstants';

export function redirectTo(redirectPath) {
    return {
        type: RouteConstants.REDIRECT,
        redirectPath: redirectPath
    }
}
