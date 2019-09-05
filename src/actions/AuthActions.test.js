import {
  INIT_APP, LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, SHOW_SESSION_WARNING,
  HIDE_SESSION_WARNING, RENEW_SESSION, LOGOUT,
} from 'constants/actionTypes'

import {
  login,
  logout,
  handleLoginSuccess,
  handleLoginError,
  initApp,
  showSessionWarning,
  hideSessionWarning,
  renewSession,
} from './AuthActions'

describe('Auth actions', () => {
  it('should create an action to initialize the app (auto login)', () => {
    const expectedAction = {
      type: INIT_APP,
      path: '/form/history/employment',
    }

    expect(initApp('/form/history/employment')).toEqual(expectedAction)
  })

  it('should create an action to login using username and password', () => {
    const expectedAction = {
      type: LOGIN,
      username: 'test01',
      password: 'password01',
    }

    expect(login('test01', 'password01')).toEqual(expectedAction)
  })

  it('should create an action to handle a successful login', () => {
    const expectedAction = {
      type: LOGIN_SUCCESS,
    }

    expect(handleLoginSuccess()).toEqual(expectedAction)
  })

  it('should create an action to handle logout', () => {
    const expectedAction = {
      type: LOGOUT,
      timedOut: false,
    }

    expect(logout()).toEqual(expectedAction)
  })

  it('should create an action to handle an unsuccessful login', () => {
    const error = 'Invalid account'
    const expectedAction = {
      type: LOGIN_ERROR,
      error: 'Invalid account',
    }

    expect(handleLoginError(error)).toEqual(expectedAction)
  })

  it('should create an action to show the session warning', () => {
    const expectedAction = {
      type: SHOW_SESSION_WARNING,
    }

    expect(showSessionWarning()).toEqual(expectedAction)
  })

  it('should create an action to hide the session warning', () => {
    const expectedAction = {
      type: HIDE_SESSION_WARNING,
    }

    expect(hideSessionWarning()).toEqual(expectedAction)
  })

  it('should create an action to renew the session', () => {
    const expectedAction = {
      type: RENEW_SESSION,
    }

    expect(renewSession()).toEqual(expectedAction)
  })
})
