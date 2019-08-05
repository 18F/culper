import {
  takeLatest, put, all, call,
} from 'redux-saga/effects'

import { api } from 'services/api'
import * as actionTypes from 'constants/actionTypes'
import { handleLoginSuccess, handleLoginError } from 'actions/AuthActions'

export function* fetchForm() {
  try {
    const response = yield call(api.form)
    yield put({ type: actionTypes.FETCH_FORM_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.FETCH_FORM_ERROR, error })
  }
}

export function* fetchStatus() {
  try {
    const response = yield call(api.status)
    yield put({ type: actionTypes.FETCH_STATUS_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.FETCH_STATUS_ERROR, error })
  }
}

export function* login({ username, password }) {
  try {
    const response = yield call(api.login, username, password)
    yield put(handleLoginSuccess(response))
  } catch (error) {
    console.log('login failed', error, username, password)
    yield put(handleLoginError(error))
  }
}

export function* loginWatcher() {
  yield takeLatest(actionTypes.LOGIN, login)
}

export function* fetchFormWatcher() {
  yield takeLatest(actionTypes.FETCH_FORM, fetchForm)
}

export function* fetchStatusWatcher() {
  yield takeLatest(actionTypes.FETCH_STATUS, fetchStatus)
}

export function* apiWatcher() {
  yield all([
    fetchFormWatcher(),
    fetchStatusWatcher(),
    loginWatcher(),
  ])
}
