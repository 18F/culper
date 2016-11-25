import { api } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, redirectToLogin, handleLoginSuccess} from './AuthActions';
import AuthConstants from './AuthConstants';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('Auth actions', function () {

    it('should create an action to login using username and password', function () {

        // Mock POST response
        const mock = new MockAdapter(api.proxy);
        mock.onPost('/auth/basic').reply(200, 'faketoken')

        const expectedActions = [
            {
                type: AuthConstants.LOGIN_SUCCESS,
                token: 'faketoken'
            },
            {
                type: 'PUSH',
                to: '/'
            }
        ];

        const store = mockStore({ authentication: [] });

        return store
            .dispatch(login('john', 'admin'))
            .then(function () {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });


    it('should create an action to handle a successful login', function () {
        const token = 'faketoken';
        const expectedAction = { type: AuthConstants.LOGIN_SUCCESS, token: token };
        expect(handleLoginSuccess(token)).toEqual(expectedAction);
    });


    it('should create an action to handle logout', function () {
        const store = mockStore({ authentication: [] });
        const expectedAction = [
            { type: AuthConstants.LOGOUT},
            { type: 'PUSH', to: '/login'}
        ];
        store.dispatch(logout('john', 'admin'));
        expect(store.getActions()).toEqual(expectedAction);
    });
});
