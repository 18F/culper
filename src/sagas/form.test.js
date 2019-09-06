import {
  select, call, put, all, takeEvery,
} from 'redux-saga/effects'

import { HANDLE_SUBSECTION_UPDATE } from 'constants/actionTypes'
import {
  updateSubsection, handleSubsectionUpdate as handleSubsectionUpdateAction,
} from 'actions/FormActions'
import { updateApplication } from 'actions/ApplicationActions'

import { env } from 'config'

import { validateSection } from 'helpers/validation'
import sectionKeys from 'helpers/sectionKeys'

import { selectSubsection, formTypeSelector } from './selectors'

import {
  // new
  updateSubsectionWatcher,
  handleSubsectionUpdate,
  updateSectionData,

  // legacy
  setFormData,
  updateSectionDataLegacy,
} from './form'

/** LEGACY ACTIONS */
describe('setFormData saga', () => {
  describe('with valid data', () => {
    const testSections = {
      Identification: {},
      History: {},
      Relationships: {},
      Metadata: {
        form_type: 'SF86',
        form_version: '2017-07',
      },
    }

    const generator = setFormData(testSections)

    it('sets the formType in the store', () => {
      expect(generator.next().value)
        .toEqual(put(updateApplication('Settings', 'formType', 'SF86')))
    })

    it('sets the formVersion in the store', () => {
      expect(generator.next().value)
        .toEqual(put(updateApplication('Settings', 'formVersion', '2017-07')))
    })

    it('calls updateSectionDataLegacy for each section', () => {
      expect(generator.next().value).toEqual(
        all(['Identification', 'History', 'Relationships', 'Metadata']
          .map(s => call(updateSectionDataLegacy, s, testSections[s])))
      )
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })

  describe('with malformed data', () => {
    const generator = setFormData(null)

    it('catches the error', () => {
      expect(generator.next().value)
        .toEqual(call(env.History().push, '/error'))
    })
  })
})

describe('updateSectionDataLegacy saga', () => {
  describe('with valid data', () => {
    const testSectionData = {
      Multiple: {},
      Passports: {},
      Status: {},
    }

    const generator = updateSectionDataLegacy('Citizenship', testSectionData)

    it('puts the updateApplication action for each subsection', () => {
      expect(generator.next().value).toEqual(
        all(['Multiple', 'Passports', 'Status'].map((s) => {
          const sectionKey = sectionKeys[`Citizenship.${s}`]
          const sectionData = testSectionData[s]

          return all([
            put(updateApplication('Citizenship', s, sectionData)),
            put(handleSubsectionUpdateAction(sectionKey, undefined, sectionData)),
          ])
        }))
      )
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })

  describe('with malformed data', () => {
    const generator = updateSectionDataLegacy(null, null)

    it('catches the error', () => {
      expect(generator.next().value)
        .toEqual(call(env.History().push, '/error'))
    })
  })
})


/** NEW ACTIONS */
describe('The updateSubsection watcher', () => {
  const generator = updateSubsectionWatcher()

  it('takes all HANDLE_SUBSECTION_UPDATE actions', () => {
    expect(generator.next().value)
      .toEqual(takeEvery(HANDLE_SUBSECTION_UPDATE, handleSubsectionUpdate))
  })

  it('is done', () => {
    expect(generator.next().done).toBe(true)
  })
})

describe('The handleSubsectionUpdate saga', () => {
  const generator = handleSubsectionUpdate({
    key: 'IDENTIFICATION_NAME',
    field: 'Name',
    data: { first: 'test data' },
  })

  it('selects the form type from state', () => {
    expect(generator.next().value)
      .toEqual(select(formTypeSelector))
  })

  it('selects the form section from state', () => {
    expect(generator.next('SF-86').value)
      .toEqual(select(selectSubsection, 'IDENTIFICATION_NAME'))
  })

  it('validates the new section data', () => {
    const prevState = { data: { first: 'old data', last: 'existing data' } }
    const newState = { first: 'test data', last: 'existing data' }

    expect(generator.next(prevState).value)
      .toEqual(call(validateSection, {
        key: 'IDENTIFICATION_NAME',
        data: newState,
      }, 'SF-86'))
  })

  it('dispatches the new section data', () => {
    const newSection = {
      data: { first: 'test data', last: 'existing data' },
      errors: ['test errors'],
      complete: false,
    }

    expect(generator.next(['test errors']).value)
      .toEqual(put(updateSubsection('IDENTIFICATION_NAME', newSection)))
  })

  it('is done', () => {
    expect(generator.next().done).toBe(true)
  })
})

describe('The updateSectionData function', () => {
  it('updates data if there is no existing data', () => {
    const fieldName = 'Name'
    const newData = { first: 'new data' }
    const oldData = undefined

    expect(updateSectionData(oldData, fieldName, newData))
      .toEqual({
        Name: { first: 'new data' },
      })
  })

  it('updates data if existing data is empty', () => {
    const fieldName = 'Name'
    const newData = { first: 'new data' }
    const oldData = { Name: {} }

    expect(updateSectionData(oldData, fieldName, newData))
      .toEqual({
        Name: { first: 'new data' },
      })
  })

  it('updates data if there is existing data', () => {
    const fieldName = 'Name'
    const newData = { first: 'new data' }
    const oldData = { Name: { first: 'old data', last: 'existing data' } }

    expect(updateSectionData(oldData, fieldName, newData))
      .toEqual({
        Name: { first: 'new data', last: 'existing data' },
      })
  })
})
