/* eslint import/prefer-default-export: 0 */
import { createSelector } from 'reselect'

import { REVIEW_AND_SUBMIT_SUBMIT, REVIEW_AND_SUBMIT_PRINT } from 'constants/sections'

import { formIsLocked } from 'validators'
import { sectionIsValid } from 'helpers/validation'
import { reduceSubsections } from 'helpers/navigation'

import { nestedFormSectionsSelector } from 'selectors/navigation'

/**
 * Recursive function that loops through sections and their subsections, checks
 * section validity using validateSection helper, and adds the isValid boolean
 * to the section object.
 */
const getFormSectionStatuses = (sections = [], store = '', state = {}) => {
  const { form } = state
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

      const { key } = s
      const isValid = !!(form[key] && form[key].complete === true)

      return {
        ...s,
        isValid,
      }
    })

  return newSections
}

const getFormStatus = (state) => {
  const formSections = nestedFormSectionsSelector(state, true)
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

const formHasErrors = (state) => {
  const formStatus = formStatusSelector(state)
  const { formIsValid } = formStatus
  return !formIsValid
}

const getSectionLocked = (state, props) => {
  const { section } = props
  const formLocked = formIsLocked(state.application)

  // Special cases
  switch (section.key) {
    case REVIEW_AND_SUBMIT_SUBMIT: {
      return formLocked || formHasErrors(state)
    }

    case REVIEW_AND_SUBMIT_PRINT:
      return !formLocked

    default:
      return formLocked
  }
}

const getSectionErrors = (state, props) => {
  const { application } = state
  const { Errors } = application

  const { topSection, section } = props

  const sectionErrors = topSection
    ? Errors[topSection]
    : Errors[section.name]

  if (!sectionErrors) { return [] }

  if (!section.subsections) {
    return sectionErrors.filter(e => e.subsection === section.name)
  }

  const flatSections = reduceSubsections(section.subsections)

  return sectionErrors.filter(s => (
    flatSections.find(i => i.name === s.subsection)
  ))
}

const getSectionCompleted = (state, props) => {
  const { form } = state
  const { section } = props

  if (section.subsections) {
    // Check complete status of each subsection
    const flatSections = reduceSubsections(section.subsections)
    const sectionsWithData = flatSections.filter(s => !!s.storeKey)
    return sectionsWithData.length > 0 && sectionsWithData.every((s) => {
      const sectionData = form && form[s.key]
      return sectionData && sectionData.complete === true
    })
  }

  const sectionData = form && form[section.key]
  if (!sectionData) return false
  return sectionData.complete === true
}

export const sectionIsLockedSelector = createSelector(
  getSectionLocked,
  locked => ({ locked })
)

export const sectionHasErrorsSelector = createSelector(
  getSectionErrors,
  (errors = []) => ({
    errors: errors.some(e => e.valid === false),
  })
)

export const sectionIsValidSelector = createSelector(
  getSectionCompleted,
  completed => ({ completed })
)
