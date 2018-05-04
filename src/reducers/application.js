import { combineReducers } from 'redux'
import relationshipsReducer from './relationships'
import historyReducer from './history'

const defaultState = {}

// Defines the authentication sub-state for the application.
export const reducer = function (sectionName) {
  return function (state = defaultState, action) {
    // Check that section matches intended section reducer. This is to prevent
    // merging of everything every time an action is dispatched. We only
    // perform for the relevant section
    if (action.section === sectionName) {
      // copy current state
      let updated = {...state}

      // Override all values for the particular reducer key
      updated[action.property] = action.values
      return updated
    }

    return state
  }
}

export const errorReducer = function (sectionName) {
  return function (state = defaultState, action) {
    // Check that section matches intended section reducer. This is to prevent
    // merging of everything every time an action is dispatched. We only
    // perform for the relevant section
    if (action.section === sectionName) {
      let sectionErrors = state[action.property] || []

      if (action.clear === true) {
        // Don't get confused now...
        //  - section = 'Errors'
        //  - property = section (i.e. 'identification')
        //  - subsection = subsection (i.e. 'contacts')
        sectionErrors = sectionErrors.filter(x => x.section === action.property && x.subsection !== action.subsection)
      } else {
        for (const value of action.values) {
          const idx = sectionErrors.findIndex(
            x =>
              x.section === value.section &&
              x.subsection === value.subsection &&
              x.uid === value.uid &&
              x.code === value.code)

          if (idx === -1) {
            sectionErrors.push(value)
          } else {
            sectionErrors[idx] = value
          }
        }
      }

      return {
        ...state,
        [action.property]: sectionErrors
      }
    }

    return state
  }
}

// High level pre-defined sub-state tree
export default combineReducers({
  Settings: reducer('Settings'),
  Identification: reducer('Identification'),
  Financial: reducer('Financial'),
  Relationships: relationshipsReducer,
  Citizenship: reducer('Citizenship'),
  Military: reducer('Military'),
  History: historyReducer,
  Foreign: reducer('Foreign'),
  TBD: reducer('Tbd'),
  Legal: reducer('Legal'),
  Psychological: reducer('Psychological'),
  Substance: reducer('Substance'),
  Submission: reducer('Submission'),
  Completed: errorReducer('Completed'),
  Errors: errorReducer('Errors'),
  AddressBooks: reducer('AddressBooks')
})

// Or alternative...
// export const appReducer = function (state = defaultState, action) {
// return merge(state, {
// [action.section]: {
// [action.property]: action.values
// }
// })
// }
