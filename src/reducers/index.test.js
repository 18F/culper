import { LOGOUT } from 'constants/actionTypes'
import rootReducer from './index'

describe('Root Reducer', () => {
  const defaultState = {
    application: {
      AddressBooks: {},
      Citizenship: {},
      Completed: {},
      Errors: {},
      Financial: {},
      Foreign: {},
      History: {},
      Identification: {},
      Legal: {},
      Military: {},
      Package: {},
      Psychological: {},
      Relationships: {},
      Settings: {
        formType: 'SF86',
      },
      Submission: {},
      Substance: {},
      TBD: {},
    },
    authentication: {
      authenticated: false,
      token: null,
      error: null,
      showSessionWarning: false,
    },
    section: {
      section: 'identification',
      subsection: '',
    },
    form: {},
  }

  it('should populate the state', () => {
    const startState = {}
    const action = { type: 'unknown' }
    expect(rootReducer(startState, action)).toEqual(defaultState)
  })

  it('should handle logout', () => {
    const startState = {
      application: {
        AddressBooks: { foo: 'bar' },
        Settings: {
          formType: 'SF86',
        },
      },
      authentication: {
        authenticated: true,
        token: 'dummytoken',
      },
      section: {
        section: 'identification',
        subsection: '',
      },
      form: {},
    }

    const action = { type: LOGOUT }
    expect(rootReducer(startState, action)).toEqual(defaultState)
  })
})
