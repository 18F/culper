import authentication from './authentication'
import { handleLoginError, handleLoginSuccess } from '../actions/AuthActions'

describe('Authentication Reducer', () => {
  const defaultState = {
    authenticated: false,
    token: null,
    error: null,
  }

  it('should return the initial state', () => {
    expect(authentication(undefined, {})).toEqual(defaultState)
  })

  it('should handle login success', () => {
    const expectedState = {
      authenticated: true,
      token: 'faketoken',
      error: null,
    }

    const action = handleLoginSuccess('faketoken')
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })

  it('should handle login error', () => {
    const expectedState = {
      authenticated: false,
      token: null,
      error: 'testError',
    }

    const action = handleLoginError('testError')
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })
})
