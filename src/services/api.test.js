import { api } from './api';
import MockAdapter from 'axios-mock-adapter';

describe('The API', () => {
    'use strict';

    it('can get information on version and endpoints', () => {
        const expected = {};
        const mock = new MockAdapter(api.proxy);
        mock.onGet('/').reply(200, {});

        let actual = null;
        api
            .information()
            .then(function (response) {
                actual = response.data;
                expect(actual).toEqual(expected);
            });
    });

    it('can set authorization token', () => {
        const token = 'my-token';
        api.setToken(token);

        let actual = api.proxySecured.defaults.headers.common.Authorization.indexOf(token);
        expect(actual).not.toEqual(-1);
    });

    it('can get PNG for two-factor authentication initialization', () => {
        const expected = 'my-fake-base64';
        const mock = new MockAdapter(api.proxy);
        mock.onGet('/2fa').reply(200, expected);

        let actual = null;
        api.setToken('my-token');
        api
            .twoFactor()
            .then(function (response) {
                actual = response.data;
                expect(actual).toEqual(expected);
            });
    });

    it('can get verify token with two-factor authentication', () => {
        const expected = '';
        const mock = new MockAdapter(api.proxy);
        mock.onPost('/2fa/verify').reply(200, expected);

        let actual = null;
        api.setToken('my-token');
        api
            .twoFactor('123456')
            .then(function (response) {
                actual = response.data;
                console.log('expected: ' + expected + ', actual: ' + actual);
                expect(actual).toEqual(expected);
            });
    });

});
