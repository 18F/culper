import { UPDATE_SUBSECTION_DATA } from 'constants/actionTypes'
import reducer from './form'

const defaultState = {}

describe('The form reducer', () => {
  it('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it('adds new subsection data', () => {
    expect(reducer(defaultState, {
      type: UPDATE_SUBSECTION_DATA,
      key: 'IDENTIFICATION_NAME',
      field: 'Name',
      data: { first: 'test data' },
    })).toEqual({
      IDENTIFICATION_NAME: {
        data: {
          Name: {
            first: 'test data',
          },
        },
      },
    })
  })

  it('updates existing subsection data', () => {
    expect(reducer({
      IDENTIFICATION_NAME: {
        data: {
          Name: {
            first: 'old name',
            last: 'old name',
          },
        },
      },
    }, {
      type: UPDATE_SUBSECTION_DATA,
      key: 'IDENTIFICATION_NAME',
      field: 'Name',
      data: { first: 'new name' },
    })).toEqual({
      IDENTIFICATION_NAME: {
        data: {
          Name: {
            first: 'new name',
            last: 'old name',
          },
        },
      },
    })
  })
})
