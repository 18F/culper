import {
  UPDATE_SUBSECTION_DATA,
  UPDATE_SUBSECTION_ERRORS,
  UPDATE_SUBSECTION_COMPLETE,
} from 'constants/actionTypes'

const defaultState = {}

const form = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_SUBSECTION_DATA: {
      const { key, field, data } = action
      // console.log(`UPDATE ${key} ${field}`)

      let formSection = state[key] || { data: {} }
      let sectionData = formSection.data || {}
      let fieldData = sectionData[field] || {}

      fieldData = { ...fieldData, ...data }
      sectionData = { ...sectionData, [`${field}`]: fieldData }
      formSection = { ...formSection, data: sectionData }

      return {
        ...state,
        [`${key}`]: formSection,
      }
    }

    case UPDATE_SUBSECTION_ERRORS: {
      const { key, errors } = action
      const formSection = state[key] || {}

      return {
        ...state,
        [`${key}`]: {
          ...formSection,
          errors,
        },
      }
    }

    case UPDATE_SUBSECTION_COMPLETE: {
      const { key, complete } = action
      const formSection = state[key] || {}

      return {
        ...state,
        [`${key}`]: {
          ...formSection,
          complete,
        },
      }
    }

    default:
      return state
  }
}

export default form
