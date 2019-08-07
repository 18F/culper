import { combineReducers } from 'redux'
import relationshipsReducer from './relationships'
import historyReducer from './history'
import errorReducer from './error'

// Defines the authentication sub-state for the application.
export const reducer = (sectionName, defaultState) => (
  (state = defaultState, action) => {
    // Check that section matches intended section reducer. This is to prevent
    // merging of everything every time an action is dispatched. We only
    // perform for the relevant section
    if (action.section === sectionName) {
      // copy current state
      const updated = { ...state }

      // Override all values for the particular reducer key
      updated[action.property] = action.values
      return updated
    }

    return state
  }
)

// High level pre-defined sub-state tree
export default combineReducers({
  Settings: reducer('Settings', {
    formType: 'SF86',
  }),
  Identification: reducer('Identification', {}),
  Financial: reducer('Financial', {}),
  Relationships: relationshipsReducer,
  Citizenship: reducer('Citizenship', {}),
  Military: reducer('Military', {}),
  History: historyReducer,
  Foreign: reducer('Foreign', {}),
  TBD: reducer('Tbd', {}),
  Legal: reducer('Legal', {}),
  Psychological: reducer('Psychological', {}),
  Substance: reducer('Substance', {}),
  Package: reducer('Package', {}),
  Submission: reducer('Submission', {}),
  Completed: errorReducer('Completed', {}),
  Errors: errorReducer('Errors', {}),
  AddressBooks: reducer('AddressBooks', {}),
})

// Or alternative...
// export const appReducer = function (state = defaultState, action) {
// return merge(state, {
// [action.section]: {
// [action.property]: action.values
// }
// })
// }
