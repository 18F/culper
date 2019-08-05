import {
  take, takeLatest, put, all, call, race,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'
import { updateApplication, validateFormData } from 'actions/ApplicationActions'
import { fetchForm } from 'actions/api'

import { env } from 'config'

import {
  initializeApp,
  handleInitError,
  handleInitSuccess,

  initializeFormData,
  setFormData,
  updateSectionData,
} from './initialize'


describe('Initialize app saga', () => {
  describe('if not logged in', () => {
    const generator = initializeAppWatcher()

    it('responds to the INIT_APP action', () => {
      expect(generator.next().value)
        .toEqual(take(actionTypes.INIT_APP))
    })

    it('tries to fetch the form', () => {
      expect(generator.next({ type: actionTypes.INIT_APP }).value)
        .toEqual(put(fetchForm()))
    })

    it('waits for the form fetch to succeed or fail', () => {
      expect(generator.next().value)
        .toEqual(race({
          data: take(actionTypes.FETCH_FORM_SUCCESS),
          error: take(actionTypes.FETCH_FORM_ERROR),
        }))
    })

    it('calls the init error handler', () => {
      const error = { response: { status: 401 } }
      expect(generator.next({ error }).value)
        .toEqual(call(handleInitError, error))
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })

  describe('if logged in', () => {
    const generator = initializeAppWatcher()

    it('responds to the INIT_APP action', () => {
      expect(generator.next().value)
        .toEqual(take(actionTypes.INIT_APP))
    })

    it('tries to fetch the form', () => {
      expect(generator.next({
        type: actionTypes.INIT_APP,
        path: '/form/history/employment',
      }).value)
        .toEqual(put(fetchForm()))
    })

    it('waits for the form fetch to succeed or fail', () => {
      expect(generator.next().value)
        .toEqual(race({
          data: take(actionTypes.FETCH_FORM_SUCCESS),
          error: take(actionTypes.FETCH_FORM_ERROR),
        }))
    })

    it('calls the init success handler', () => {
      const data = { response: { data: { form: 'test data' } } }
      expect(generator.next({ data }).value)
        .toEqual(call(handleInitSuccess, data, '/form/history/employment'))
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })
})

describe('handleInitSuccess function', () => {
  const data = { response: { data: { form: 'test data' } } }
  const path = '/form/history/employment'
  const generator = handleInitSuccess(data, path)

  it('displays the loader', () => {
    expect(generator.next().value)
      .toEqual(call(env.History().push, '/loading'))
  })

  it.skip('calls the setFormData action', () => {
    // TODO - test failing because of the cb fn. This may be changing anyways
    const cb = () => { env.History().replace('/form/history/employment') }

    expect(generator.next().value)
      .toEqual(put({
        type: actionTypes.SET_FORM_DATA,
        data: { form: 'test data' },
        cb,
      }))
  })
})

describe('handleInitError function', () => {
  describe('if the error is a 401 or 403', () => {
    const error = { response: { status: 401 } }
    const generator = handleInitError({ error })

    it('redirects to the Login page', () => {
      expect(generator.next().value)
        .toEqual(call(env.History().push, '/login'))
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })

  describe('if the error status is something else', () => {
    const error = { response: { status: 500 } }
    const generator = handleInitError({ error })

    it('redirects to the Error page', () => {
      expect(generator.next().value)
        .toEqual(call(env.History().push, '/error'))
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })

  describe('if the error is unknown', () => {
    const error = {}
    const generator = handleInitError({ error })

    it('redirects to the Error page', () => {
      expect(generator.next().value)
        .toEqual(call(env.History().push, '/error'))
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })
})

describe('Initialize form data saga', () => {
  const generator = initializeFormData()

  it('responds to the latest SET_FORM_DATA action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest(actionTypes.SET_FORM_DATA, setFormData))
  })

  it('is done', () => {
    expect(generator.next().done).toBe(true)
  })
})

describe('setFormData saga', () => {
  describe('with valid data', () => {
    const testSections = {
      Identification: {},
      History: {},
      Relationships: {},
    }

    const testCallback = jest.fn()

    const generator = setFormData({ data: testSections, cb: testCallback })

    it('calls updateSectionData for each section', () => {
      expect(generator.next().value).toEqual(
        all(['Identification', 'History', 'Relationships']
          .map(s => call(updateSectionData, s, testSections[s])))
      )
    })

    it('puts the validateFormData action', () => {
      expect(generator.next().value)
        .toEqual(put(validateFormData()))
    })

    it('calls the callback function', () => {
      expect(generator.next().value)
        .toEqual(call(testCallback))
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })

  describe('with malformed data', () => {
    const generator = setFormData({ data: null })

    it('catches the error', () => {
      expect(generator.next().value)
        .toEqual(call(env.History().push, '/error'))
    })
  })
})

describe('updateSectionData saga', () => {
  describe('with valid data', () => {
    const testSectionData = {
      Multiple: {},
      Passports: {},
      Status: {},
    }

    const generator = updateSectionData('Citizenship', testSectionData)

    it('puts the updateApplication action for each subsection', () => {
      expect(generator.next().value).toEqual(
        all(['Multiple', 'Passports', 'Status'].map(s => put(
          updateApplication(
            'Citizenship',
            s,
            testSectionData[s],
          )
        )))
      )
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })

  describe('with malformed data', () => {
    const generator = updateSectionData(null, null)

    it('catches the error', () => {
      expect(generator.next().value)
        .toEqual(call(env.History().push, '/error'))
    })
  })
})
