import AuthConstants from '../actions/AuthConstants';

const defaultState = {
    authenticated: false,
    token: null
};

// Defines the authentication sub-state for the application.
const authentication = function (state = defaultState, action) {
    switch (action.type) {
        // Logs the user in
        case AuthConstants.LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                token: action.token
            };
        case AuthConstants.LOGOUT:
            return {
                ...state,
                authenticated: false,
                token: null
            };
        default:
            return state;
    }
};

export default authentication;
