/* eslint import/prefer-default-export: 0 */
import { createSelector } from 'reselect'

import { validateSection, sectionIsValid } from 'helpers/validation'

import {
  nestedFormSectionsSelector,
} from './navigation'

/**
 * Recursive function that loops through sections and their subsections, checks
 * section validity using validateSection helper, and adds the isValid boolean
 * to the section object.
 */
const getFormSectionStatuses = (sections = [], store = '', state = {}) => {
  const { application } = state
  const newSections = sections
    .filter(s => s.subsections || s.storeKey)
    .map((s) => {
      if (s.subsections) {
        const parentStore = store || s.store
        return {
          ...s,
          subsections: getFormSectionStatuses(s.subsections, parentStore, state),
        }
      }

      const sectionData = application[store][s.storeKey] || {}
      const isValid = validateSection({ ...s, data: sectionData })

      return {
        ...s,
        isValid,
      }
    })

  return newSections
}

const getFormStatus = (state) => {
  const formSections = nestedFormSectionsSelector(state)
  const formSectionStatuses = getFormSectionStatuses(formSections, '', state)
  return formSectionStatuses
}

export const formStatusSelector = createSelector(
  getFormStatus,
  formSections => ({
    formSections,
    formIsValid: sectionIsValid(formSections),
  })
)
