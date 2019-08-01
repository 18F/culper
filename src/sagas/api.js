import {
  take, put, all, call, race,
} from 'redux-saga/effects'
import { api } from 'services/api'
import * as actionTypes from 'constants/actionTypes'
import { env } from 'config'

export function* callFetchForm() {
  try {
    const response = yield call(api.form)
    yield put({ type: actionTypes.FETCH_FORM_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.FETCH_FORM_ERROR, error })
  }
}

function* handleFetchFormError(action) {
  const { error } = action

  console.log("CHECKING")

  if (error && error.response) {
    switch (error.response.status) {
      case 401:
      case 403:
        console.log('pusthing LOGIN')
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

function* handleFetchFormSuccess(data) {
  console.log("SUCCESS ROUTE", data)
  // TODO go to the loader
  yield call(env.History().push, '/form/identification/intro')
}

function* fetchFormResponseWatcher() {
  const { data, error } = yield race({
    data: take(actionTypes.FETCH_FORM_SUCCESS),
    error: take(actionTypes.FETCH_FORM_ERROR),
  })

  if (error) {
    yield call(handleFetchFormError, error)
  } else {
    yield call(handleFetchFormSuccess, data)
  }
}

export function* fetchFormWatcher() {
  while (true) {
    yield take(actionTypes.FETCH_FORM)
    yield all([
      call(callFetchForm),
      call(fetchFormResponseWatcher),
    ])
  }
}

export function* apiWatcher() {
  yield all([
    fetchFormWatcher(),
  ])
}
