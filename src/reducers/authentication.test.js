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
      twofactor: false,
      error: ''
    }

    const action = {
      type: AuthConstants.LOGIN_SUCCESS,
      token: 'faketoken'
    }
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })

  it('should handle login error', function () {
    const expectedState = {
      authenticated: false,
      token: null,
      twofactor: false,
      error: undefined
    }

    const action = {
      type: AuthConstants.LOGIN_ERROR
    }
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })

  it('should handle two factor qrcode', function () {
    const expectedState = {
      authenticated: false,
      token: null,
      qrcode: undefined
    }

    const action = {
      type: AuthConstants.TWOFACTOR_QRCODE
    }
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })

  it('should handle two factor success', function () {
    const expectedState = {
      authenticated: true,
      token: null,
      twofactor: true
    }

    const action = {
      type: AuthConstants.TWOFACTOR_SUCCESS
    }
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })

  it('should handle two factor error', function () {
    const expectedState = {
      authenticated: false,
      token: null,
      twofactor: false,
      error: undefined
    }

    const action = {
      type: AuthConstants.TWOFACTOR_ERROR
    }
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })
})
