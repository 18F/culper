import {
  call, race, take, put, takeLatest, delay,
} from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import { sessionWatcher, sessionTimeout, handleLogout } from 'sagas/session'
import * as actionTypes from 'constants/actionTypes'

import { env } from 'config'

const timeoutLength = env.SessionTimeout()

describe('The sessionTimeout saga', () => {
  const generator = cloneableGenerator(sessionTimeout)()

  it('waits for the RENEW_SESSION action or the timeout length to pass', () => {
    expect(generator.next().value)
      .toEqual(race({
        timeout: delay((timeoutLength - 1) * 60000),
        renew: take(actionTypes.RENEW_SESSION),
      }))
  })

  describe('if the session is renewed', () => {
    const renewed = generator.clone()
    renewed.next()

    it('restarts the sessionTimeout', () => {
      expect(renewed.next({ renew: { type: actionTypes.RENEW_SESSION } }).value)
        .toEqual(call(sessionTimeout))
    })

    it('is done', () => {
      expect(renewed.next().done).toEqual(true)
    })
  })

  describe('if the session times out', () => {
    const timeout = generator.clone()
    timeout.next()

    it('displays the Timeout Warning', () => {
      expect(timeout.next({ timeout: true }).value)
        .toEqual(put({ type: actionTypes.SHOW_SESSION_WARNING }))
    })

    it('waits for the RENEW_SESSION action or one minute to pass', () => {
      expect(timeout.next().value)
        .toEqual(race({
          logout: delay(60000),
          renew: take(actionTypes.RENEW_SESSION),
        }))
    })

    describe('if the Timeout Warning times out', () => {
      const logout = generator.clone()
      logout.next()
      logout.next({ timeout: true })
      logout.next()

      it('calls handleLogout', () => {
        expect(logout.next({ logout: true }).value)
          .toEqual(call(handleLogout, true))
      })

      it('is done', () => {
        expect(logout.next().done).toEqual(true)
      })
    })

    describe('if the session is renwed', () => {
      const renewed = generator.clone()
      renewed.next()
      renewed.next({ timeout: true })
      renewed.next()

      it('hides the TimeoutWarning', () => {
        expect(renewed.next({ renew: { type: actionTypes.RENEW_SESSION } }).value)
          .toEqual(put({ type: actionTypes.HIDE_SESSION_WARNING }))
      })

      it('restarts the sessionTimeout', () => {
        expect(renewed.next().value)
          .toEqual(call(sessionTimeout))
      })

      it('is done', () => {
        expect(renewed.next().done).toEqual(true)
      })
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
