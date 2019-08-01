import {
  take, takeLatest, put, all, call, race,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'

import { fetchForm } from 'actions/api'

import { updateApplication, validateFormData } from 'actions/ApplicationActions'
import { unschema } from 'schema'

import { env } from 'config'

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

/** Initialize app (on page load) */
export function* handleInitError(action) {
  const { error } = action

  if (error && error.response) {
    switch (error.response.status) {
      case 401:
      case 403:
        yield call(env.History().push, '/login')
        yield call(authWatcher) // TODO - maybe this should be called on mount of login?
        break
      default:
        yield call(env.History().push, '/error')
    }
  } else {
    console.warn('Unknown error', error)
    yield call(env.History().push, '/error')
  }
}

export function* handleInitSuccess(action, path = '/form/identification/intro') {
  const { response } = action
  console.log('success', action, path)
  yield call(env.History().push, '/loading')

  if (response && response.data) {
    console.log('GO TO', path)
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

export function* initializeApp() {
  const initAction = yield take(actionTypes.INIT_APP)
  const { path } = initAction

  // TODO - maybe this should be a status call instead (check if locked)
  // attempt to load the form
  yield put(fetchForm())

  // watch for success or failure
  const { data, error } = yield race({
    data: take(actionTypes.FETCH_FORM_SUCCESS),
    error: take(actionTypes.FETCH_FORM_ERROR),
  })

  if (error) {
    yield call(handleInitError, error)
  } else {
    yield call(handleInitSuccess, data, path)
  }
}

/** Login/logout flow */
// TODO - need to add session timeout piece
export function* authWatcher() {
  while (true) {
    const { error } = yield race({
      success: take(actionTypes.LOGIN_SUCCESS),
      error: take(actionTypes.LOGIN_ERROR),
    })

    if (error) {
      // TODO - handle login/auth errors here
      yield
    } else {
      // login successful - fetch form again
      // TODO extract this out
      yield put(fetchForm())

      // watch for success or failure
      const { data, error } = yield race({
        data: take(actionTypes.FETCH_FORM_SUCCESS),
        error: take(actionTypes.FETCH_FORM_ERROR),
      })

      if (error) {
        yield call(handleInitError, error)
      } else {
        yield call(handleInitSuccess, data)
      }
    }
  }
}
