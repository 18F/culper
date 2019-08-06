import {
  put, call, race, take, takeLatest, delay,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'
import { env } from 'config'

const timeoutLength = env.SessionTimeout()

export function* sessionTimeout() {
  const { renew } = yield race({
    timeout: delay(timeoutLength),
    renew: take(actionTypes.RENEW_SESSION),
  })

  if (renew) {
    yield call(sessionTimeout)
  } else {
    yield put({ type: actionTypes.SHOW_SESSION_WARNING })
  }
}

export function* sessionWatcher() {
  yield takeLatest(actionTypes.FETCH_STATUS_SUCCESS, sessionTimeout)
}
