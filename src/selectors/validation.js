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

const getFormErrors = (state) => {
  const { application } = state
  const formSections = nestedFormSectionsSelector(state)
  const sectionStoreKeys = reduceFormSectionStores(formSections)

  const formErrors = sectionStoreKeys.map((s) => {
    const { key, store, storeKey } = s
    const storeData = application[store][storeKey] || {}

    const isValid = validateSection(key, storeData)

    return {
      ...s,
      storeData,
      isValid,
    }
  })

  return formErrors
}

export const formErrorsSelector = createSelector(
  getFormErrors,
  formErrors => ({
    formErrors,
    formIsValid: formErrors.every(s => s.isValid),
  })
)
