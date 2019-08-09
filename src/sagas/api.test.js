import {
  takeLatest, put, all, call,
} from 'redux-saga/effects'
import * as actionTypes from 'constants/actionTypes'
import { api } from 'services/api'

import { updateApplication } from 'actions/ApplicationActions'
import { handleLoginSuccess, handleLoginError, logout as logoutAction } from 'actions/AuthActions'

import {
  apiWatcher,
  fetchFormWatcher,
  fetchStatusWatcher,
  renewSessionWatcher,
  logoutWatcher,
  fetchForm,
  loginWatcher,
  login,
  fetchStatus,
  renewSession,
  logout,
} from './api'

describe('The apiWatcher', () => {
  const generator = apiWatcher()

  it('starts all API call watchers', () => {
    expect(generator.next().value)
      .toEqual(all([
        fetchFormWatcher(),
        fetchStatusWatcher(),
        loginWatcher(),
        renewSessionWatcher(),
        logoutWatcher(),
      ]))
  })

  it('is done', () => {
    expect(generator.next().done).toEqual(true)
  })
})

describe('The loginWatcher', () => {
  const generator = loginWatcher()

  it('responds to the LOGIN action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest(actionTypes.LOGIN, login))
  })

  it('is done', () => {
    expect(generator.next().done).toEqual(true)
  })
})

describe('The fetchFormWatcher', () => {
  const generator = fetchFormWatcher()

  it('responds to the FETCH_FORM action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest(actionTypes.FETCH_FORM, fetchForm))
  })

  it('is done', () => {
    expect(generator.next().done).toEqual(true)
  })
})

describe('The fetchStatusWatcher', () => {
  const generator = fetchStatusWatcher()

  it('responds to the FETCH_STATUS action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest(actionTypes.FETCH_STATUS, fetchStatus))
  })

  it('is done', () => {
    expect(generator.next().done).toEqual(true)
  })
})

describe('The renewSessionWatcher', () => {
  const generator = renewSessionWatcher()

  it('responds to the RENEW_SESSION action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest(actionTypes.RENEW_SESSION, renewSession))
  })

  it('is done', () => {
    expect(generator.next().done).toEqual(true)
  })
})

describe('The logoutWatcher', () => {
  const generator = logoutWatcher()

  it('responds to the LOGOUT action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest(actionTypes.LOGOUT, logout))
  })

  it('is done', () => {
    expect(generator.next().done).toEqual(true)
  })
})

describe('The renewSession saga', () => {
  describe('if the API call succeeds', () => {
    const generator = renewSession()

    it('calls the refresh API', () => {
      expect(generator.next().value)
        .toEqual(call(api.refresh))
    })

    it.skip('updates the lastRefresh value in the store', () => {
      // TODO need to mock timestamp
      expect(generator.next({ response: { status: 200 } }).value)
        .toEqual(put(updateApplication('Settings', 'lastRefresh', new Date().getTime())))
    })
  })

  describe('if the API call fails', () => {
    const generator = renewSession()

    it('calls the refresh API', () => {
      expect(generator.next().value)
        .toEqual(call(api.refresh))
    })

    it('puts the logoutAction', () => {
      expect(generator.throw({ response: { status: 401 } }).value)
        .toEqual(put(logoutAction(true)))
    })
  })
})

describe('The fetchForm saga', () => {
  describe('if the API call succeeds', () => {
    const generator = fetchForm()

    it('calls the form API', () => {
      expect(generator.next().value)
        .toEqual(call(api.form))
    })

    it('puts the fetchFormSuccess action', () => {
      expect(generator.next({ test: 'data' }).value)
        .toEqual(put({ type: actionTypes.FETCH_FORM_SUCCESS, response: { test: 'data' } }))
    })
  })

  describe('if the API call fails', () => {
    const generator = fetchForm()

    it('calls the form API', () => {
      expect(generator.next().value)
        .toEqual(call(api.form))
    })

    it('puts the fetchFormError action', () => {
      expect(generator.throw('error').value)
        .toEqual(put({ type: actionTypes.FETCH_FORM_ERROR, error: 'error' }))
    })
  })
})

describe('The fetchStatus saga', () => {
  describe('if the API call succeeds', () => {
    const generator = fetchStatus()

    it('calls the status API', () => {
      expect(generator.next().value)
        .toEqual(call(api.status))
    })

    it('puts the fetchStatusSuccess action', () => {
      expect(generator.next({ test: 'data' }).value)
        .toEqual(put({ type: actionTypes.FETCH_STATUS_SUCCESS, response: { test: 'data' } }))
    })
  })

  describe('if the API call fails', () => {
    const generator = fetchStatus()

    it('calls the form API', () => {
      expect(generator.next().value)
        .toEqual(call(api.status))
    })

    it('puts the fetchStatusError action', () => {
      expect(generator.throw('error').value)
        .toEqual(put({ type: actionTypes.FETCH_STATUS_ERROR, error: 'error' }))
    })
  })
})

describe('The login saga', () => {
  describe('if the API call succeeds', () => {
    const generator = login({ username: 'test', password: 'testPassword' })

    it('calls the login API', () => {
      expect(generator.next().value)
        .toEqual(call(api.login, 'test', 'testPassword'))
    })

    it('puts the handleLoginSuccess action', () => {
      expect(generator.next({ test: 'data' }).value)
        .toEqual(put(handleLoginSuccess({ test: 'data' })))
    })
  })

  describe('if the API call fails', () => {
    const generator = login({ username: 'test', password: 'testPassword' })

    it('calls the login API', () => {
      expect(generator.next().value)
        .toEqual(call(api.login, 'test', 'testPassword'))
    })

    it('puts the handleLoginError action', () => {
      expect(generator.throw({ response: { data: { errors: ['test error'] } } }).value)
        .toEqual(put(handleLoginError(['test error'])))
    })
  })
})

describe('The logout saga', () => {
  const generator = logout()

  it('calls the logout API', () => {
    expect(generator.next().value)
      .toEqual(call(api.logout))
  })

  it('is done', () => {
    expect(generator.next().done).toEqual(true)
  })
})
