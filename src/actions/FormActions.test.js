import * as actionTypes from 'constants/actionTypes'
import { updateSubsectionData } from './FormActions'

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
})
