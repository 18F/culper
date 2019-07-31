import { env } from 'config'
import { takeLatest, put, all, call } from 'redux-saga/effects'
import { api } from 'services/api'
import * as actionTypes from 'constants/actionTypes'

function* callFetchForm() {
  try {
    console.log("AEEPI", api)

    const response = yield call(api.form)
    console.log("WELDLL")
    yield put({type: actionTypes.FETCH_FORM_SUCCESS})
  } catch (error) {
    console.log("ERROR FETCHING FORM", error)
    yield put({type: actionTypes.FETCH_FORM_ERROR})
  }
}

function* handleFetchFormSuccess() {
  console.log("SUCCESS")
}


function* fetchFormWatcher() {
  console.log("WATCHING FOR FORM FETCHING")
  while (true) {
    yield take(actionTypes.FETCH_FORM, callFetchForm)
    yield call(callFetchForm)
    const { data, error } = yield race({
      data: take(actionTypes.FETCH_FORM_SUCCESS),
      error: take(actionTypes.FETCH_FORM_ERROR),
    })

    if (error) {
      yield call(errorHandler, error)
    } else {
      yield call(successHandler, data)
    }
  }
}

export function* apiWatcher() {
  yield all([
    fetchFormWatcher(),
    ])
}
