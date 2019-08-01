import {
  takeLatest, put, all, call,
} from 'redux-saga/effects'

import { api } from 'services/api'
import * as actionTypes from 'constants/actionTypes'

export function* fetchForm() {
  try {
    const response = yield call(api.form)
    yield put({ type: actionTypes.FETCH_FORM_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.FETCH_FORM_ERROR, error })
  }
}

export function* fetchFormWatcher() {
  yield takeLatest(actionTypes.FETCH_FORM, fetchForm)
}

export function* apiWatcher() {
  yield all([
    fetchFormWatcher(),
  ])
}
