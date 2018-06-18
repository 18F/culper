const defaultState = {}

const errorReducer = function (sectionName) {
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

export default errorReducer
