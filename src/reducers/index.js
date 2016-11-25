import { combineReducers } from 'redux';
import authentication from './authentication';

const rootReducer = combineReducers({
    authentication: authentication
})

export default rootReducer;
