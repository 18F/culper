import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Home } from './views';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
        </Route>
    </Router>
    , app);
