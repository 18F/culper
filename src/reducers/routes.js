const defaultState = {
    redirectPath: null,
    redirect: false
};

// Defines a basic reducer for handling application wide redirects
const routes = function(state = defaultState, action) {
    switch (action.type ) {
        // Logs the user in
        case 'REDIRECT':
            return {
                ...state,
                redirect: true,
                redirectPath: action.redirectPath
            };
        case 'CLEAR_REDIRECT':
            return {
                ...state,
                redirect: false,
                redirectPath: null
            }
    }

    return state;
};


export default routes;
