import authentication from './authentication'
import AuthConstants from '../actions/AuthConstants'

describe('Authentication Reducer', function () {
  const defaultState = {
    authenticated: false,
    token: null
  }

  it('should return the initial state', function () {
    expect(authentication(undefined, {})).toEqual(defaultState)
  })

  it('should handle login success', function () {
    const expectedState = {
      authenticated: true,
      token: 'faketoken',
      twofactor: false
    }

    const action = {
      type: AuthConstants.LOGIN_SUCCESS,
      token: 'faketoken'
    }
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })

  it('should handle logout', function () {
    const expectedState = {
      authenticated: false,
      token: null,
      twofactor: false
    }

    const action = {
      type: AuthConstants.LOGOUT
    }

    expect(authentication(defaultState, action)).toEqual(expectedState)
  })
})
