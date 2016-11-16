import React from 'react';
import { GithubOAuth } from '../../services';

export default class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            authenticated: GithubOAuth.authenticated(),
        };
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
    }

    logout () {
        GithubOAuth.logout();
        location.href = '/';
    }

    login () {
        location.href = GithubOAuth.url;
    }

    render () {
        if (this.state.authenticated) {
            return (
                <button type="button" onClick={this.logout}>Logout</button>
            );
        }
        else {
            return (
                <button type="button" onClick={this.login}>Login</button>
            );
        }

    }
}
