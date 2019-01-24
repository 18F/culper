import authentication from './authentication'
import { handleLoginError, handleLoginSuccess } from '../actions/AuthActions'

describe('Authentication Reducer', function() {
  const defaultState = {
    authenticated: false,
    token: null,
    formType: '86'
  }

  it('should return the initial state', function() {
    expect(authentication(undefined, {})).toEqual(defaultState)
  })

  it('should handle login success', function() {
    const expectedState = {
      authenticated: true,
      token: 'faketoken',
      error: '',
      formType: '86'
    }

    const action = handleLoginSuccess('faketoken')
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })

  it('should handle login error', function() {
    const expectedState = {
      authenticated: false,
      token: null,
      error: undefined,
      formType: '86'
    }

    const action = handleLoginError()
    expect(authentication(defaultState, action)).toEqual(expectedState)
  })

  it('should return SF-86 as default form type', () => {
    const action = handleLoginSuccess('success', '86')
    expect(authentication(defaultState, action).formType).toEqual(defaultState.formType)
  })

  it('should set the formType', () => {
    const fixture = '85'
    const action = handleLoginSuccess('faketoken', fixture)
    expect(authentication(defaultState, action).formType).toEqual(fixture)
  })
})
