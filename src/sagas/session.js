import {
  put, call, race, take, takeLatest, delay,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'

import { env } from 'config'

const timeoutLength = env.SessionTimeout() // timeout length in minutes
const oneMinute = 60000 // milliseconds

export function* handleLogout(tokenError = false) {
  yield
}

export function* sessionTimeout() {
  const { renew } = yield race({
    timeout: delay((timeoutLength - 1) * oneMinute),
    renew: take(actionTypes.RENEW_SESSION),
  })

  if (renew) {
    // Reset the timeout
    yield call(sessionTimeout)
  } else {
    // Show TimeoutWarning and wait 1 minute
    yield put({ type: actionTypes.SHOW_SESSION_WARNING })
    const { logout } = yield race({
      logout: delay(oneMinute),
      renew: take(actionTypes.RENEW_SESSION),
    })

    if (logout) {
      // 1 minute passed, log out
      yield call(handleLogout, true)
    } else {
      // User refreshed the session
      yield put({ type: actionTypes.HIDE_SESSION_WARNING })
      yield call(sessionTimeout)
    }
  }
}

export function* sessionWatcher() {
  yield takeLatest(actionTypes.FETCH_STATUS_SUCCESS, sessionTimeout)
}
