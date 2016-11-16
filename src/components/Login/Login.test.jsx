import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';
import { GithubOAuth, OAuth } from '../../services';

describe('The login button', () => {
    it('renders login button if not authenticated', () => {
        GithubOAuth.token = null;
        GithubOAuth.expiration = null;

        let login = shallow(
            <Login />
        );

        expect(login.text()).toEqual('Login');
    });

    it('renders logout button if authenticated', () => {
        GithubOAuth.token = 'faketoken';
        GithubOAuth.expiration = new Date('2017-12-01');

        let logout = shallow(
            <Login />
        );

        expect(logout.text()).toEqual('Logout');
    });
});
