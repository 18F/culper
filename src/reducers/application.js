import { combineReducers } from 'redux'
import merge from 'deepmerge'

const defaultState = {}

// Defines the authentication sub-state for the application.
const reducer = function (sectionName) {
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

const errorReducer = function (sectionName) {
  return function (state = defaultState, action) {
    // Check that section matches intended section reducer. This is to prevent
    // merging of everything every time an action is dispatched. We only
    // perform for the relevant section
    if (action.section === sectionName) {
      return {
        ...state,
        [action.property]: action.values
      }
    }

    return state
  }
}

// High level pre-defined sub-state tree
export default combineReducers({
  Identification: reducer('Identification'),
  Financial: reducer('Financial'),
  Family: reducer('Family'),
  Citizenship: reducer('Citizenship'),
  Military: reducer('Military'),
  History: reducer('History'),
  Foreign: reducer('Foreign'),
  TBD: reducer('Tbd'),
  Legal: reducer('Legal'),
  Completed: reducer('Completed'),
  Errors: errorReducer('Errors'),
  Saved: (state = {}) => {
    // Store when things were last saved
    state.date = new Date()
    return state
  }
})

// Or alternative...
// export const appReducer = function (state = defaultState, action) {
  // return merge(state, {
    // [action.section]: {
      // [action.property]: action.values
    // }
  // })
// }
