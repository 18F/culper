import { SF86 } from 'constants/formTypes'
import rootReducer from './index'
import AuthConstants from '../actions/AuthConstants'

describe('Root Reducer', function() {
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
      Psychological: {},
      Relationships: {},
      Settings: {},
      Submission: {},
      Substance: {},
      TBD: {}
    },
    authentication: {
      authenticated: false,
      formType: SF86,
      token: null
    },
    section: {
      section: 'identification',
      subsection: ''
    }
  }

  it('should populate the state', function() {
    const startState = {}
    const action = { type: 'unknown' }
    expect(rootReducer(startState, action)).toEqual(defaultState)
  })

  it('should handle logout', function() {
    const startState = {
      application: {
        AddressBooks: { foo: 'bar' }
      },
      authentication: {
        authenticated: true,
        token: 'dummytoken'
      },
      section: {
        section: 'identification',
        subsection: ''
      }
    }

    const action = { type: AuthConstants.LOGOUT }
    expect(rootReducer(startState, action)).toEqual(defaultState)
  })
})
