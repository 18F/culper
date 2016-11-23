import { api } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, handleLoginSuccess } from './AuthActions';
import AuthConstants from './AuthConstants';
import RouteConstants from './RouteConstants';
import { redirectTo } from './RouteActions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('Route actions', function () {


    it('should create an action to handle redirects', function () {
        const redirectPath = '/';
        const expectedAction = { type: RouteConstants.REDIRECT, redirectPath: redirectPath };
        expect(redirectTo(redirectPath)).toEqual(expectedAction);
    });


});
