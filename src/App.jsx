import React from 'react';
import { Login } from './components';
import { GithubOAuth } from './services';

export default class App extends React.Component {
    constructor (props) {
        super(props);

        // If there are OAuth values returned then store them.
        let token = GithubOAuth.getQueryValue('token');
        let expiration = GithubOAuth.getQueryValue('expiration');
        if (token || expiration) {
            GithubOAuth.token = token;
            GithubOAuth.expiration = expiration;
        }
    }

    componentDidMount () {
    }

    render () {
        return (
            <div>
                <h1>E-QIP Prototype</h1>
                <Login />
                {this.props.children}
            </div>
        );
    }
}
