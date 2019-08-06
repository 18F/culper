import {
  take, takeLatest, put, all, call, race, spawn,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'
import { STATUS_SUBMITTED } from 'constants/enums/applicationStatuses'

import { fetchForm, fetchStatus } from 'actions/api'

import { updateApplication, validateFormData } from 'actions/ApplicationActions'
import { unschema } from 'schema'

import { env } from 'config'

import { validateWatcher } from 'sagas/validate'
import { updateSubsectionWatcher } from 'sagas/form'

/** Setting form data on login (this might be replaced) */
export function* updateSectionData(name, data) {
  try {
    yield all(Object.keys(data).map(subsection => put(
      updateApplication(
        name,
        subsection,
        unschema(data[subsection]),
      )
    )))
  } catch (e) {
    console.warn('failed to update section', name, e)
    yield call(env.History().push, '/error')
  }
}

export function* setFormData(action) {
  const { data, cb } = action

  try {
    yield all(Object.keys(data)
      .map(section => call(updateSectionData, section, data[section])))

    yield put(validateFormData())
    yield call(cb)
  } catch (e) {
    console.warn('failed to set form data', e)
    yield call(env.History().push, '/error')
  }
}

export function* initializeFormData() {
  yield takeLatest(actionTypes.SET_FORM_DATA, setFormData)
}

export function* loggedOutWatcher() {
  const { error } = yield race({
    success: take(actionTypes.LOGIN_SUCCESS),
    error: take(actionTypes.LOGIN_ERROR),
  })

  if (error) {
    // Restart the watcher for the next login attempt
    yield call(loggedOutWatcher)
  } else {
    yield call(initializeApp)
  }
}

export function* loggedInWatcher() {
  yield all([
    call(validateWatcher),
    call(updateSubsectionWatcher),
    call(initializeFormData),
  ])
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

export function* handleFetchFormSuccess(action, path) {
  const { response } = action

  if (response && response.data) {
    const cb = () => { env.History().replace(path) }
    yield put({
      type: actionTypes.SET_FORM_DATA,
      data: response.data,
      cb,
    })
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
