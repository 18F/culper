import {
  take, takeLatest, put, all, call, race,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'

import { fetchForm } from 'actions/api'
import { updateApplication, validateFormData } from 'actions/ApplicationActions'
import { unschema } from 'schema'

import { env } from 'config'

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

export function* handleInitError(action) {
  const { error } = action

  if (error && error.response) {
    switch (error.response.status) {
      case 401:
      case 403:
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
