import authentication from './authentication'
import { handleLoginError, handleLoginSuccess } from '../actions/AuthActions'

describe('Authentication Reducer', () => {
  const defaultState = {
    authenticated: false,
    token: null,
  }

  it('should return the initial state', () => {
    expect(authentication(undefined, {})).toEqual(defaultState)
  })

  it('should handle login success', () => {
    const expectedState = {
      authenticated: true,
      token: 'faketoken',
      error: '',
    }

    const action = handleLoginSuccess('faketoken')
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })

  it('should handle login error', () => {
    const expectedState = {
      authenticated: false,
      token: null,
      error: undefined,
    }

    const action = handleLoginError()
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })
})
