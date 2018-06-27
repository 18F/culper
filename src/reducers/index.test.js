import rootReducer from './index'
import AuthConstants from '../actions/AuthConstants'

describe('Root Reducer', function () {
  const defaultState = {
    application: {
      AddressBooks: { },
      Citizenship: { },
      Completed: { },
      Errors: { },
      Financial: { },
      Foreign: { },
      History: { },
      Identification: { },
      Legal: { },
      Military: { },
      Psychological: { },
      Relationships: { },
      Settings: { },
      Submission: { },
      Substance: { },
      TBD: { }
    },
    authentication: {
      authenticated: false,
      token: null
    },
    section: {
      section: "identification",
      subsection: ""
    }
  }

  it('should populate the state', function () {
    const startState = {}
    const action = { type: 'unknown' }
    expect(rootReducer(startState, action)).toEqual(defaultState)
  })
})
