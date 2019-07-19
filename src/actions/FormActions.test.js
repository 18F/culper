import * as actionTypes from 'constants/actionTypes'
import {
  updateSubsectionData,
  updateSubsectionErrors,
  updateSubsectionComplete,
} from './FormActions'

describe('Form actions', () => {
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
