import { api } from '../services/api';
import AuthConstants from './AuthConstants';
import { hashHistory } from 'react-router';
import { redirectTo } from './RouteActions';

export function login(username, password) {
    return function (dispatch, getState) {
        return api
            .login(username, password)
            .then(r => {
                dispatch(handleLoginSuccess(r.data));
                dispatch(redirectTo('/'));
                //dispatch(redirectTo('/'));
            });
    };
}

export function logout() {
    return function (dispatch, getState) {

        // TODO server side call to invalidate token
        dispatch({
            type: AuthConstants.LOGOUT
        });
        dispatch(redirectTo('/login'));
    };
}


export function handleLoginSuccess(token) {
    return {
        type: AuthConstants.LOGIN_SUCCESS,
        token: token
    };
}
