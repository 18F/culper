import {
  takeLatest, put, all, call,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'
import { updateApplication, validateFormData } from 'actions/ApplicationActions'

import { env } from 'config'

import {
  initializeFormData,
  setFormData,
  updateSectionData,
} from './initialize'

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
