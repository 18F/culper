import * as actionTypes from 'constants/actionTypes'
import {
  handleSubsectionUpdate,
  updateSubsection,
  updateSubsectionData,
  updateSubsectionErrors,
  updateSubsectionComplete,
} from './FormActions'

describe('Form actions', () => {
  it('should create an action for handling section updates', () => {
    const expectedAction = {
      type: actionTypes.HANDLE_SUBSECTION_UPDATE,
      key: 'IDENTIFICATION_NAME',
      field: 'Name',
      data: { first: 'test data' },
    }

    expect(handleSubsectionUpdate('IDENTIFICATION_NAME', 'Name', { first: 'test data' }))
      .toEqual(expectedAction)
  })

  it('should create an action for updating a whole subsection object', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_SUBSECTION,
      key: 'IDENTIFICATION_NAME',
      subsection: { data: 'test data', errors: ['test error'], complete: false },
    }

    expect(updateSubsection('IDENTIFICATION_NAME', {
      data: 'test data', errors: ['test error'], complete: false,
    }))
      .toEqual(expectedAction)
  })

  it('should create an action for updating section data', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_SUBSECTION_DATA,
      key: 'IDENTIFICATION_NAME',
      field: 'Name',
      data: { first: 'test data' },
    }

    expect(updateSubsectionData('IDENTIFICATION_NAME', 'Name', { first: 'test data' }))
      .toEqual(expectedAction)
  })

  it('should create an action for updating a section’s errors', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_SUBSECTION_ERRORS,
      key: 'IDENTIFICATION_NAME',
      errors: ['test error 1', 'test error 2'],
    }

    expect(updateSubsectionErrors('IDENTIFICATION_NAME', ['test error 1', 'test error 2']))
      .toEqual(expectedAction)
  })

  it('should create an action for updating whether a section is complete', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_SUBSECTION_COMPLETE,
      key: 'IDENTIFICATION_NAME',
      complete: true,
    }

    expect(updateSubsectionComplete('IDENTIFICATION_NAME', true))
      .toEqual(expectedAction)
  })
})
