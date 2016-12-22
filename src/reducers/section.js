import SectionConstants from '../actions/SectionConstants'

const defaultState = {
  title: ''
}

// Defines the authentication sub-state for the application.
const section = function (state = defaultState, action) {
  switch (action.type) {
    case SectionConstants.UPDATE:
      return {
        ...state,
        title: action.title
      }

    default:
      return state
  }
}

export default section
