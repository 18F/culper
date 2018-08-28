const defaultState = {}

// returns the list of errors with those from this subsection removed
const clearErrors = (sectionErrors, action) => {
  return sectionErrors.filter(
    x => x.section === action.property && x.subsection !== action.subsection
  )
}

const errorMatches = (err1, err2) => {
  return err1.section === err2.section && err1.code === err2.code
}

const getErrorIndex = (sectionErrors, err) => {
  return sectionErrors.findIndex(x => errorMatches(x, err))
}

// modifies the sectionErrors
const updateError = (sectionErrors, err) => {
  const idx = getErrorIndex(sectionErrors, err)
  if (idx === -1) {
    sectionErrors.push(err)
  } else {
    sectionErrors[idx] = err
  }
}

// modifies the sectionErrors
const updateErrors = (sectionErrors, action) => {
  for (const err of action.values) {
    updateError(sectionErrors, err)
  }
}

const errorReducer = function(sectionName) {
  return function(state = defaultState, action) {
    // Check that section matches intended section reducer. This is to prevent
    // merging of everything every time an action is dispatched. We only
    // perform for the relevant section
    if (action.section === sectionName) {
      // Don't get confused now...
      //  - section = 'Errors'
      //  - property = section (i.e. 'identification')
      //  - subsection = subsection (i.e. 'contacts')

      let sectionErrors = state[action.property] || []

      if (action.clear === true) {
        sectionErrors = clearErrors(sectionErrors, action)
      } else {
        updateErrors(sectionErrors, action)
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
