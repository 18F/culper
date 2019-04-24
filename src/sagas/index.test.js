import {
  takeLatest, select, put, all, call,
} from 'redux-saga/effects'

import * as actionTypes from 'constants/actionTypes'
import { nestedFormSectionsSelector } from 'selectors/navigation'
import { validateSection } from 'helpers/validation'
import { reportCompletion } from 'actions/ApplicationActions'

import rootSaga, {
  updateSectionStatus,
  validateFormData,
  validateApplication,
  selectState,
} from './index'

describe('Root saga', () => {
  const generator = rootSaga()

  it('starts the validate application saga', () => {
    expect(generator.next().value).toEqual(call(validateApplication))
  })

  it('is done', () => {
    expect(generator.next().done).toBe(true)
  })
})

describe('Validate application saga', () => {
  const generator = validateApplication()

  it('responds to the latest VALIDATE_FORM_DATA action', () => {
    expect(generator.next().value)
      .toEqual(takeLatest(actionTypes.VALIDATE_FORM_DATA, validateFormData))
  })

  it('is done', () => {
    expect(generator.next().done).toBe(true)
  })
})

describe('Validate form data saga', () => {
  const generator = validateFormData()

  it('selects the nested form sections', () => {
    expect(generator.next().value).toEqual(select(nestedFormSectionsSelector))
  })

  it('selects the whole application state', () => {
    expect(generator.next([]).value).toEqual(select(selectState))
  })

  it('calls updateSectionStatus for all form sections', () => {
    expect(generator.next({}).value).toEqual(all([].map(s => call(updateSectionStatus, s, '', {}))))
  })

  it('is done', () => {
    expect(generator.next().done).toBe(true)
  })
})

describe('updateSectionStatus saga', () => {
  describe('for an invalid section', () => {
    const invalidSection = {}
    const generator = updateSectionStatus(invalidSection)

    it('yields nothing', () => {
      expect(generator.next().value).toBe(undefined)
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })

  describe('for a parent section', () => {
    const testState = {
      application: {
        testSection: {
          testSubsection: {
            data: 'my data',
          },
        },
      },
    }

    const testSection = {
      store: 'testSection',
      subsections: [
        { name: 'testSubsection', storeKey: 'testSubsection' },
      ],
    }

    const generator = updateSectionStatus(testSection, '', testState)

    it('calls updateSectionStatus for all subsections', () => {
      expect(generator.next().value)
        .toEqual(
          all(testSection.subsections.map(s => (
            call(updateSectionStatus, s, testSection.store, testState)
          )))
        )
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })

  describe('for a subsection', () => {
    const testState = {
      application: {
        testSection: {
          testSubsection: {
            data: 'my data',
          },
        },
      },
    }

    const testSection = {
      store: 'testSection',
      subsections: [
        { name: 'testSubsection', storeKey: 'testSubsection' },
      ],
    }

    const generator = updateSectionStatus(testSection.subsections[0], testSection.store, testState)

    it('calls validateSection with the section data', () => {
      expect(generator.next().value)
        .toEqual(call(validateSection, { ...testSection.subsections[0], data: { data: 'my data' } }))
    })

    it('dispatches reportCompletion for the subsection', () => {
      expect(generator.next(false).value)
        .toEqual(put(reportCompletion('testsection', 'testsubsection', false)))
    })

    it('is done', () => {
      expect(generator.next().done).toBe(true)
    })
  })
})
