import { UPDATE_SUBSECTION_DATA } from 'constants/actionTypes'

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

    default:
      return state
  }
}

export default form
