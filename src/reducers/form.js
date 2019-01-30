import FormConstants from './../actions/FormConstants'

	const defaultState = {
    name: '',
    formType: '',
    formNumber: '',
    sections: [],
    totalSections: 0,
    completedSectionsTotal: 0,
	}

  function formReducer(state = defaultState, action) {
    switch(action.type) {
      case FormConstants.UPDATE_FORM:
        return {
          ...state,
          ...action.form
        }
      case FormConstants.UPDATE_SECTION_TOTAL:
        return {
          ...state,
          totalSections: action.total,
        }
      case FormConstants.UPDATE_COMPLETED_SECTION_TOTAL:
        return {
          ...state,
          completedSectionsTotal: action.completed
        }
      default:
        return state;
    }
  }

	export default formReducer
