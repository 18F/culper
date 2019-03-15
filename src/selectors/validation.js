import { createSelector } from 'reselect'

import { validateSection } from 'helpers/validation'

import {
  nestedFormSectionsSelector,
} from './navigation'

export const reduceFormSectionStores = (sections = [], store = '') => (
  sections.reduce((acc, section) => {
    if (section.subsections) {
      const parentStore = store || section.store

      return acc.concat(reduceFormSectionStores(section.subsections, parentStore))
    }

    if (section.storeKey) {
      acc.push({
        key: section.key,
        store,
        storeKey: section.storeKey,
      })
    }

    return acc
  }, [])
)

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
    formIsValid: formSections.every(s => s.isValid),
  })
)
