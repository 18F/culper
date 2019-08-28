import {
  takeLatest, put, all, call,
} from 'redux-saga/effects'
import queryString from 'query-string'

import { env } from 'config'

import { api } from 'services/api'
import * as actionTypes from 'constants/actionTypes'
import { NETWORK_ERROR, UNKNOWN_ERROR } from 'constants/errorCodes'

import { updateApplication } from 'actions/ApplicationActions'
import { handleLoginSuccess, handleLoginError, logout as logoutAction } from 'actions/AuthActions'

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

    // for testing with query params
    if (env.IsDevelopment() || env.IsStaging()) {
      const params = window.location.search
      const query = queryString.parse(params)

      if (query.formType) window.formType = query.formType
      if (query.status) window.status = query.status.toUpperCase()
    }

    yield put(handleLoginSuccess(response))
  } catch (error) {
    // Expected error format:
    // { errors: [{ message: "", code: "" }, { message: "", code: "" }] }
    if (error.response) {
      const { data, status } = error.response
      if (data && data.errors) {
        yield put(handleLoginError(data.errors))
      } else {
        yield put(handleLoginError([{
          message: UNKNOWN_ERROR,
          code: UNKNOWN_ERROR,
          status,
        }]))
      }
    } else {
      // No response - API unreachable
      yield put(handleLoginError([{ message: NETWORK_ERROR, code: NETWORK_ERROR }]))
    }
  }
}

export function* renewSession() {
  try {
    yield call(api.refresh)
    yield put(updateApplication('Settings', 'lastRefresh', new Date().getTime()))
  } catch (error) {
    yield put(logoutAction(true))
  }
}

export function* logout() {
  yield call(api.logout)
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

export function* renewSessionWatcher() {
  yield takeLatest(actionTypes.RENEW_SESSION, renewSession)
}

export function* logoutWatcher() {
  yield takeLatest(actionTypes.LOGOUT, logout)
}

export function* apiWatcher() {
  yield all([
    fetchFormWatcher(),
    fetchStatusWatcher(),
    loginWatcher(),
    renewSessionWatcher(),
    logoutWatcher(),
  ])
}
