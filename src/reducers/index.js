import { combineReducers } from 'redux';
import authentication from './authentication';
import routes from './routes';

const rootReducer = combineReducers({
    routes: routes,
    authentication: authentication,
})

export default rootReducer;
