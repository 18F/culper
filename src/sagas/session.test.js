import {
  call, race, take, put, takeLatest, delay,
} from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import { sessionWatcher, sessionTimeout } from 'sagas/session'
import * as actionTypes from 'constants/actionTypes'

import { env } from 'config'

const timeoutLength = env.SessionTimeout()

describe('The sessionTimeout saga', () => {
  const generator = cloneableGenerator(sessionTimeout)()

  it('waits for the RENEW_SESSION action or the timeout to pass', () => {
    expect(generator.next().value)
      .toEqual(race({
        timeout: delay(timeoutLength),
        renew: take(actionTypes.RENEW_SESSION),
      }))
  })

  describe('if the session times out', () => {
    const timeout = generator.clone()
    timeout.next()

    it('displays the Timeout Warning', () => {
      expect(timeout.next({ timeout: true }).value)
        .toEqual(put({ type: actionTypes.SHOW_SESSION_WARNING }))
    })
  })

  describe('if the session is renewed', () => {
    const renewed = generator.clone()
    renewed.next()

    it('restarts the sessionTimeout', () => {
      expect(renewed.next({ renew: { type: actionTypes.RENEW_SESSION } }).value)
        .toEqual(call(sessionTimeout))
    })
  })
})

describe('The sessionWatcher saga', () => {
  const generator = sessionWatcher()

  it('starts a session with the FETCH_STATUS_SUCCESS action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest(actionTypes.FETCH_STATUS_SUCCESS, sessionTimeout))
  })
})
