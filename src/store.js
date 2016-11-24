import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';

// Creates a redux store that defines the state tree for the application.
// See rootReducer for all sub-states.
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default store;
