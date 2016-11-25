import { api } from '../services/api';
import AuthConstants from './AuthConstants';
import { hashHistory } from 'react-router';
import { push } from '../middleware/history';

/**
 * Executes a request to log in the user and then
 * dispatches a login success handler and redirects to
 * home page.
 */
export function login(username, password) {
    return function (dispatch, getState) {
        return api
            .login(username, password)
            .then(r => {
                dispatch(handleLoginSuccess(r.data));
                dispatch(push('/'));
            });
    };
}

/**
 * Logs out a user
 */
export function logout() {
    return function (dispatch, getState) {

        // TODO server side call to invalidate token
        dispatch({
            type: AuthConstants.LOGOUT
        });
        dispatch(push('/login'));
    };
}


export function handleLoginSuccess(token) {
    return {
        type: AuthConstants.LOGIN_SUCCESS,
        token: token
    };
}
