import {
  take, select, call, put,
} from 'redux-saga/effects'

import { HANDLE_SUBSECTION_UPDATE } from 'constants/actionTypes'
import { updateSubsection } from 'actions/FormActions'
import { validateSection } from 'helpers/validation'

import { selectSubsection, formTypeSelector } from './selectors'

import {
  updateSubsectionWatcher,
  handleSubsectionUpdate,
  updateSectionData,
} from './form'


describe('The updateSubsection watcher', () => {
  const generator = updateSubsectionWatcher()

  it('takes all HANDLE_SUBSECTION_UPDATE actions', () => {
    expect(generator.next().value)
      .toEqual(take(HANDLE_SUBSECTION_UPDATE))
  })

  it('calls the handleSubsectionUpdate handler', () => {
    const action = {
      type: HANDLE_SUBSECTION_UPDATE,
      key: 'IDENTIFICATION_NAME',
      field: 'Name',
      data: { first: 'test data' },
    }

    expect(generator.next(action).value)
      .toEqual(call(handleSubsectionUpdate, action))
  })

  it('is never done', () => {
    expect(generator.next().done).toBe(false)
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

  it('updates the section data with the new data', () => {
    const prevState = {
      data: { first: 'old data', last: 'existing data' },
    }

    expect(generator.next(prevState).value)
      .toEqual(call(updateSectionData, prevState.data, 'Name', { first: 'test data' }))
  })

  it('validates the new section data', () => {
    const newState = { first: 'test data', last: 'existing data' }

    expect(generator.next(newState).value)
      .toEqual(call(validateSection, 'IDENTIFICATION_NAME', newState, 'SF-86'))
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
