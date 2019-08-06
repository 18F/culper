import {
  handleLoginError,
  handleLoginSuccess,
  showSessionWarning,
  hideSessionWarning,
} from 'actions/AuthActions'

import authentication from './authentication'

describe('Authentication Reducer', () => {
  const defaultState = {
    authenticated: false,
    token: null,
    error: null,
    showSessionWarning: false,
  }

  it('should return the initial state', () => {
    expect(authentication(undefined, {})).toEqual(defaultState)
  })

  it('should handle showing the session warning', () => {
    const expectedState = {
      ...defaultState,
      showSessionWarning: true,
    }

    const action = showSessionWarning()
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })

  it('should handle hiding the session warning', () => {
    const expectedState = {
      ...defaultState,
      showSessionWarning: false,
    }

    const action = hideSessionWarning()
    expect(authentication({ ...defaultState, showSessionWarning: true }, action))
      .toEqual(expectedState)
  })

  it('should handle login success', () => {
    const expectedState = {
      ...defaultState,
      authenticated: true,
      error: null,
    }

    const action = handleLoginSuccess()
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })

  it('should handle login error', () => {
    const expectedState = {
      ...defaultState,
      authenticated: false,
      error: 'testError',
    }

    const action = handleLoginError('testError')
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })
})
