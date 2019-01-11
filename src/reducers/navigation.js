import NavigationConstants from './../actions/NavigationsConstants'

const defaultState = {
  sections: [],
  totalSections: 0,
  completedSectionsTotal: 0,
}

function navigationReducer(state = defaultState, action) {
  switch(action.type) {
    case NavigationConstants.UPDATE_NAVIGATION:
      return {
        ...state,
        sections: action.sections
      }
    case NavigationConstants.UPDATE_SECTION_TOTAL:
      return {
        ...state,
        totalSections: action.total,
      }
    case NavigationConstants.UPDATE_COMPLETED_SECTION_TOTAL:
      return {
        ...state,
        completedSectionsTotal: action.completed
      }
    default:
      return state;
  }
}

export default navigationReducer
