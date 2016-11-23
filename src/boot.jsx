import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Home, Login, Help } from './views';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import { api } from './services/api';
import { handleLoginSuccess } from './actions/AuthActions';
import { clearRedirect } from './actions/RouteActions';

const app = document.getElementById('app');

// Subscribe to updates within application
store.subscribe(listener);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App} onEnter={onEnter}>
                <IndexRoute component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/help" component={Help} />
            </Route>
        </Router>
    </Provider>
    , app);


function onEnter () {
    const token = api.getQueryValue('token');
    if (token) {
        store.dispatch(handleLoginSuccess(token));
    }
}

/**
 * Shows use of lower-level store object to subsribe to events. This one
 * specically handles router redirects when logging in and out.
 */
function listener() {
    console.log('Listener');
    const { redirect, redirectPath }  = store.getState().routes;
    if (redirect) {
        hashHistory.push(redirectPath);
    }
}
