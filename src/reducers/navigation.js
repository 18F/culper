import NavigationConstants from './../actions/NavigationsConstants'

const defaultState = {
  sections: [],
  totalSectionsCount: 0,
  completedSectionsCount: 0,
}

function navigationReducer(state = defaultState, action) {
  switch(action.type) {
    case NavigationConstants.UPDATE_NAVIGATION:
      return {
        ...state,
        sections: action.sections
      }
    case NavigationConstants.UPDATE_SECTION_COUNT:
      return {
        ...state,
        totalSectionsCount: action.total,
        completedSectionsCount: action.completed
      }
    default:
      return state;
  }
}

export default navigationReducer
