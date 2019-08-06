import {
  take, takeLatest, put, all, call, race, spawn,
} from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import * as actionTypes from 'constants/actionTypes'
import { updateApplication, validateFormData } from 'actions/ApplicationActions'
import { fetchStatus, fetchForm } from 'actions/api'

import { env } from 'config'

import { validateWatcher } from 'sagas/validate'
import { updateSubsectionWatcher } from 'sagas/form'

import {
  initializeAppWatcher,
  initializeApp,
  handleFetchError,
  handleInitError,
  handleInitSuccess,
  loggedOutWatcher,
  loggedInWatcher,

  initializeFormData,
  setFormData,
  updateSectionData,
  handleFetchFormSuccess,
} from './initialize'


describe('initializeAppWatcher', () => {
  const generator = initializeAppWatcher()

  const initAction = {
    type: actionTypes.INIT_APP,
    path: '/form/history/employment',
  }

  it('waits for the INIT_APP action', () => {
    expect(generator.next().value)
      .toEqual(take(actionTypes.INIT_APP))
  })

  it('calls the initializeApp saga with the path', () => {
    expect(generator.next(initAction).value)
      .toEqual(call(initializeApp, '/form/history/employment'))
  })

  it('is done', () => {
    expect(generator.next().done).toEqual(true)
  })
})

describe('Initialize app saga', () => {
  const path = '/form/history/employment'
  const generator = cloneableGenerator(initializeApp)(path)

  it('tries to fetch the status', () => {
    expect(generator.next().value)
      .toEqual(put(fetchStatus()))
  })

  it('waits for the status fetch to succeed or fail', () => {
    expect(generator.next().value)
      .toEqual(race({
        data: take(actionTypes.FETCH_STATUS_SUCCESS),
        error: take(actionTypes.FETCH_STATUS_ERROR),
      }))
  })

  describe('if not logged in', () => {
    const loggedOut = generator.clone()
    loggedOut.next()
    loggedOut.next()

    it('calls the init error handler', () => {
      const error = { response: { status: 401 } }
      expect(loggedOut.next({ error }).value)
        .toEqual(call(handleInitError, error))
    })

    it('is done', () => {
      expect(loggedOut.next().done).toBe(true)
    })
  })

  describe('if logged in', () => {
    const loggedIn = generator.clone()
    loggedIn.next()
    loggedIn.next()

    it('calls the init success handler', () => {
      const data = { response: { data: { form: 'test data' } } }
      expect(loggedIn.next({ data }).value)
        .toEqual(call(handleInitSuccess, data, '/form/history/employment'))
    })

    it('is done', () => {
      expect(loggedIn.next().done).toBe(true)
    })
  })
})

describe('handleInitError function', () => {
  const generator = handleInitError('test action')

  it('calls the handleFetchError function', () => {
    expect(generator.next().value)
      .toEqual(call(handleFetchError, 'test action'))
  })
})

describe('handleInitSuccess function', () => {
  describe('if there is no response data', () => {
    const generator = handleInitSuccess({ type: actionTypes.FETCH_STATUS_SUCCESS })

    it('redirects to the error screen', () => {
      expect(generator.next().value)
        .toEqual(call(env.History().push, '/error'))
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })

  describe('if the form is locked', () => {
    const data = { response: { data: { Status: 'SUBMITTED' } } }
    const path = '/form/history/employment'
    const generator = handleInitSuccess(data, path)

    it('redirects to the locked screen', () => {
      expect(generator.next().value)
        .toEqual(call(env.History().push, '/locked'))
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })

  describe('if the form is not locked', () => {
    const data = { response: { data: { Status: 'INCOMPLETE' } } }
    const path = '/form/history/employment'
    const generator = cloneableGenerator(handleInitSuccess)(data, path)

    it('spawns the loggedInWatcher', () => {
      expect(generator.next().value)
        .toEqual(spawn(loggedInWatcher))
    })

    it('displays the loader', () => {
      expect(generator.next().value)
        .toEqual(call(env.History().push, '/loading'))
    })

    it('fetches the form data', () => {
      expect(generator.next().value)
        .toEqual(put(fetchForm()))
    })

    it('waits for the form fetch to succeed or fail', () => {
      expect(generator.next().value)
        .toEqual(race({
          data: take(actionTypes.FETCH_FORM_SUCCESS),
          error: take(actionTypes.FETCH_FORM_ERROR),
        }))
    })

    describe('if the form fetch succeeds', () => {
      const formSuccess = generator.clone()
      const formData = { response: { data: { form: 'test form' } } }

      formSuccess.next()
      formSuccess.next()
      formSuccess.next()
      formSuccess.next()

      it('calls handleFetchFormSuccess', () => {
        expect(formSuccess.next({ data: formData }).value)
          .toEqual(call(handleFetchFormSuccess, formData, path))
      })
    })

    describe('if the form fetch fails', () => {
      const formError = generator.clone()
      const error = { response: { status: 500 } }

      formError.next()
      formError.next()
      formError.next()
      formError.next()

      it('calls handleFetchError', () => {
        expect(formError.next({ error }).value)
          .toEqual(call(handleFetchError, error))
      })
    })
  })
})

// TODO
describe.skip('handleFetchFormSuccess function', () => {
  /*
  const generator = handleFetchFormSuccess()

  it.skip('calls the setFormData action', () => {
  const cb = () => { env.History().replace('/form/history/employment') }

  expect(generator.next().value)
    .toEqual(put({
      type: actionTypes.SET_FORM_DATA,
      data: { form: 'test data' },
      cb,
    }))
  })
  */
})

describe('handleFetchError function', () => {
  describe('if the error is a 401 or 403', () => {
    const error = { response: { status: 401 } }
    const generator = handleFetchError({ error })

    it('spawns the loggedOutWatcher', () => {
      expect(generator.next().value)
        .toEqual(spawn(loggedOutWatcher))
    })

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
    const generator = handleFetchError({ error })

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
    const generator = handleFetchError({ error })

    it('redirects to the Error page', () => {
      expect(generator.next().value)
        .toEqual(call(env.History().push, '/error'))
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })
})

describe('The loggedOutWatcher', () => {
  const generator = cloneableGenerator(loggedOutWatcher)()

  it('waits for a LOGIN_SUCCESS or LOGIN_ERROR', () => {
    expect(generator.next().value)
      .toEqual(race({
        success: take(actionTypes.LOGIN_SUCCESS),
        error: take(actionTypes.LOGIN_ERROR),
      }))
  })

  describe('if login is successful', () => {
    const success = generator.clone()
    success.next()

    it('initializes the app', () => {
      expect(success.next({ success: { type: actionTypes.LOGIN_SUCCESS } }).value)
        .toEqual(call(initializeApp))
    })
  })

  describe('if login fails', () => {
    const failed = generator.clone()
    failed.next()

    it('restarts the loggedOutWatcher', () => {
      expect(failed.next({ error: { type: actionTypes.LOGIN_ERROR } }).value)
        .toEqual(call(loggedOutWatcher))
    })

    it('is done', () => {
      expect(failed.next().done).toEqual(true)
    })
  })
})

describe('The loggedInWatcher', () => {
  const generator = loggedInWatcher()

  it('starts the form data watchers', () => {
    expect(generator.next().value).toEqual(all([
      call(validateWatcher),
      call(updateSubsectionWatcher),
      call(initializeFormData),
    ]))
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
