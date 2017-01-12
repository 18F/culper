import SectionConstants from '../actions/SectionConstants'

const defaultState = {
  section: 'identification',
  subsection: '',
  title: ''
}

// Defines the authentication sub-state for the application.
const section = function (state = defaultState, action) {
  switch (action.type) {
    case SectionConstants.SECTION_UPDATE:
      return {
        ...state,
        title: action.title,
        section: action.section,
        subsection: action.subsection
      }

    default:
      return state
  }
}

export default section
