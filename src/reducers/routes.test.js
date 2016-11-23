import routes from './routes';
import RouteConstants from '../actions/RouteConstants';

describe('Route Reducer', function () {

    const defaultState = {
        redirectPath: null,
        redirect: false
    };

    it('should return the initial state', function () {
        expect(routes(undefined, {})).toEqual(defaultState)

    });

    it('should handle redirect', function () {
        const expectedState = {
            redirectPath: '/',
            redirect: true

        };
        const action = {
            type: RouteConstants.REDIRECT,
            redirectPath: '/'
        };
        expect(routes(defaultState, action)).toEqual(expectedState);
    });

});
