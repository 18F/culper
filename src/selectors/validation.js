/* eslint import/prefer-default-export: 0 */
import { createSelector } from 'reselect'

import { validateSection, sectionIsValid } from 'helpers/validation'

import { nestedFormSectionsSelector } from 'selectors/navigation'
import { formTypeSelector } from 'selectors/formType'

/**
 * Recursive function that loops through sections and their subsections, checks
 * section validity using validateSection helper, and adds the isValid boolean
 * to the section object.
 */
const getFormSectionStatuses = (sections = [], store = '', state = {}) => {
  const { application } = state
  const formType = formTypeSelector(state)
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

      // TODO HACK
      // The if else conditional was introduced as a one-off hack to fix
      // validation errors that occurred. This hack should be removed.
      // https://github.com/18F/e-QIP-prototype/issues/1608
      let sectionData
      if (store === 'Citizenship' && s.storeKey === 'Passport') {
        sectionData = application.Foreign.Passport
      } else {
        sectionData = application[store][s.storeKey] || {}
      }

      const isValid = validateSection({ ...s, data: sectionData }, formType) === true

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
