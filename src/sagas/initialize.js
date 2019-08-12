/* eslint import/no-cycle: 0 */
import {
  take, put, call, race, spawn, all,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'
import { STATUS_SUBMITTED } from 'constants/enums/applicationStatuses'

import { fetchForm, fetchStatus } from 'actions/api'

import { updateApplication } from 'actions/ApplicationActions'

import { env } from 'config'

import { validateWatcher } from 'sagas/validate'
import { setFormData, updateSubsectionWatcher } from 'sagas/form'
import { handleLogout } from 'sagas/session'

export function* loggedOutWatcher() {
  const { error } = yield race({
    success: take(actionTypes.LOGIN_SUCCESS),
    error: take(actionTypes.LOGIN_ERROR),
  })

  if (error) {
    // Restart the watcher for the next login attempt
    yield call(loggedOutWatcher)
  } else {
    yield call(initializeApp) // eslint-disable-line
  }
}

export function* loggedInWatcher() {
  const { logout } = yield race({
    loggedIn: all([
      call(validateWatcher),
      call(updateSubsectionWatcher),
    ]),
    logout: take(actionTypes.LOGOUT),
  })

  if (logout) {
    const { timedOut } = logout
    yield call(handleLogout, timedOut)
  }
}

/** This is a somewhat generic handler for API fetch failures */
export function* handleFetchError(action) {
  const { error } = action

  if (error && error.response) {
    switch (error.response.status) {
      case 401:
      case 403:
        yield spawn(loggedOutWatcher)
        yield call(env.History().push, '/login')
        break
      default:
        yield call(env.History().push, '/error')
    }
  } else {
    console.warn('Unknown error', error)
    yield call(env.History().push, '/error')
  }
}

export function* handleFetchFormSuccess(data, path) {
  const { response } = data

  if (response && response.data) {
    yield call(setFormData, response.data)
    yield call(env.History().replace, path)
  } else {
    console.warn('Missing response', response)
    yield call(env.History().push, '/error')
  }
}

/** Initialize app (on page load) */
export function* handleInitError(action) {
  yield call(handleFetchError, action)
}

export function* handleInitSuccess(action, path = '/form/identification/intro') {
  const { response } = action

  if (response && response.data) {
    const { Status, Hash } = response.data
    // TODO - consolidate these into one action
    yield put(updateApplication('Settings', 'status', Status))
    yield put(updateApplication('Settings', 'hash', Hash))

    const headers = response.headers
    const csrfToken = headers['x-csrf-token']

    if (csrfToken == "") {
      console.error("No CSRF Token sent with /status. /save calls are going to fail.")
    }
    window.csrfToken = csrfToken

    // Check to see if the account is locked
    const status = response.data
    if (status.Status === STATUS_SUBMITTED) {
      yield call(env.History().push, '/locked')
      return
    }

    // start watching for logged in events
    yield spawn(loggedInWatcher)

    // attempt to load /form
    yield call(env.History().push, '/loading')
    yield put(fetchForm())

    // watch for success or failure
    const { data, error } = yield race({
      data: take(actionTypes.FETCH_FORM_SUCCESS),
      error: take(actionTypes.FETCH_FORM_ERROR),
    })

    if (error) {
      yield call(handleFetchError, error)
    } else {
      yield call(handleFetchFormSuccess, data, path)
    }
  } else {
    console.warn('Missing response', response)
    yield call(env.History().push, '/error')
  }
}

export function* initializeApp(path) {
  // attempt to load /status
  yield put(fetchStatus())

  // watch for success or failure
  const { data, error } = yield race({
    data: take(actionTypes.FETCH_STATUS_SUCCESS),
    error: take(actionTypes.FETCH_STATUS_ERROR),
  })

  if (error) {
    yield call(handleInitError, error)
  } else {
    yield call(handleInitSuccess, data, path)
  }
}

/**
 * Main saga entry point
 * kicks off auto-login if logged in
 * kicks off login screen if not
 */
export function* initializeAppWatcher() {
  const initAction = yield take(actionTypes.INIT_APP)
  const { path } = initAction
  yield call(initializeApp, path)
}
