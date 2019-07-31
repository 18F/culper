import {
  takeLatest, put, all, call,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'

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
    yield call(env.History().push, '/error')
  }
}

export function* initializeFormData() {
  yield takeLatest(actionTypes.SET_FORM_DATA, setFormData)
}

export function* fetchForm() {
  yield put({ type: actionTypes.FETCH_FORM })
}


export function* initializeApp() {
  yield takeLatest(actionTypes.INIT_APP, fetchForm)
}
