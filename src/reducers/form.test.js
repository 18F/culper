import {
  UPDATE_SUBSECTION_DATA,
  UPDATE_SUBSECTION_ERRORS,
  UPDATE_SUBSECTION_COMPLETE,
} from 'constants/actionTypes'
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

  it('updates subsection errors', () => {
    expect(reducer({
      IDENTIFICATION_NAME: {
        data: {
          Name: {
            first: 'old name',
            last: 'old name',
          },
        },
        errors: ['old error'],
      },
    }, {
      type: UPDATE_SUBSECTION_ERRORS,
      key: 'IDENTIFICATION_NAME',
      errors: ['test error 1', 'test error 2'],
    })).toEqual({
      IDENTIFICATION_NAME: {
        data: {
          Name: {
            first: 'old name',
            last: 'old name',
          },
        },
        errors: ['test error 1', 'test error 2'],
      },
    })
  })

  it('updates subsection complete status to true', () => {
    expect(reducer({
      IDENTIFICATION_NAME: {
        data: {
          Name: {
            first: 'old name',
            last: 'old name',
          },
        },
        errors: ['old error'],
        complete: false,
      },
    }, {
      type: UPDATE_SUBSECTION_COMPLETE,
      key: 'IDENTIFICATION_NAME',
      complete: true,
    })).toEqual({
      IDENTIFICATION_NAME: {
        data: {
          Name: {
            first: 'old name',
            last: 'old name',
          },
        },
        errors: ['old error'],
        complete: true,
      },
    })
  })

  it('updates subsection complete status to false', () => {
    expect(reducer({
      IDENTIFICATION_NAME: {
        data: {
          Name: {
            first: 'old name',
            last: 'old name',
          },
        },
        errors: ['old error'],
        complete: true,
      },
    }, {
      type: UPDATE_SUBSECTION_COMPLETE,
      key: 'IDENTIFICATION_NAME',
      complete: false,
    })).toEqual({
      IDENTIFICATION_NAME: {
        data: {
          Name: {
            first: 'old name',
            last: 'old name',
          },
        },
        errors: ['old error'],
        complete: false,
      },
    })
  })
})
