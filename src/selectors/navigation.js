import update from 'immutability-helper'
import { createSelector } from 'reselect'

import { formTypeSelector } from 'selectors/formType'
import * as formTypeConfig from 'config/formTypes'
import * as sections from 'constants/sections'

import { hideSelectiveService } from 'validators/selectiveservice'
import { hideDisciplinaryProcedures } from 'validators/militarydisciplinary'
import { hideExistingConditions } from 'validators/psychological'

// TODO - migrate/deprecate formHasErrors after form validation logic is cleaned up
import { formHasErrors, reduceSubsections } from 'helpers/navigation'

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
  const { application } = state
  const { Completed } = application

  const { topSection, section } = props

  const sectionCompleted = topSection
    ? Completed[topSection]
    : Completed[section.name]

  if (!sectionCompleted) { return [] }

  if (!section.subsections) {
    return sectionCompleted.filter(s => s.subsection === section.name)
  }

  const flatSections = reduceSubsections(section.subsections)

  return sectionCompleted.filter(s => (
    flatSections.find(i => i.name === s.subsection)
  ))
}

const getFormLocked = (state) => {
  const { application } = state
  const { Settings } = application
  return Settings && Settings.locked
}

const getSectionLocked = (state, props) => {
  const { section } = props
  const formIsLocked = getFormLocked(state)

  // Special cases
  switch (section.key) {
    case sections.REVIEW_AND_SUBMIT_SUBMIT: {
      return formIsLocked || formHasErrors(state)
    }

    case sections.REVIEW_AND_SUBMIT_PRINT:
      return !formIsLocked

    default:
      return formIsLocked
  }
}

export const sectionHasErrorsSelector = createSelector(
  getSectionErrors,
  (errors = []) => ({
    errors: errors.some(e => e.valid === false),
  })
)

export const sectionIsValidSelector = createSelector(
  getSectionCompleted,
  (completed = []) => ({
    completed: completed.length > 0 && completed.every(c => c.valid),
  })
)

export const sectionIsLockedSelector = createSelector(
  getSectionLocked,
  locked => ({ locked })
)

export const hideSelectiveServiceSelector = (state) => {
  const { application } = state
  return hideSelectiveService(application)
}

export const hideDisciplinaryProceduresSelector = (state) => {
  const { application } = state

  return hideDisciplinaryProcedures(application)
}

export const hideExistingConditionsSelector = (state) => {
  const { application } = state

  return hideExistingConditions(application)
}

const getFormSections = createSelector(
  formTypeSelector,
  hideDisciplinaryProceduresSelector,
  hideSelectiveServiceSelector,
  hideExistingConditionsSelector,
  (formType, disciplinaryProceduresHidden, selectiveServiceHidden, existingConditionsHidden) => {
    // Make a copy b/c we are going to mutate this
    // Might want to add & use update here to make this easier
    let formTypeSections = formTypeConfig[formType]

    if (disciplinaryProceduresHidden || selectiveServiceHidden) {
      const militarySection = formTypeSections.find(s => s.key === sections.MILITARY)
      const militarySectionIndex = formTypeSections.findIndex(s => s.key === sections.MILITARY)
      let militarySubsections = [...militarySection.subsections]

      if (disciplinaryProceduresHidden) {
        militarySubsections = militarySubsections
          .filter(s => s.key !== sections.MILITARY_DISCIPLINARY)
      }

      if (selectiveServiceHidden) {
        militarySubsections = militarySubsections
          .filter(s => s.key !== sections.MILITARY_SELECTIVE)
      }

      const newMilitarySection = update(militarySection, {
        subsections: { $set: militarySubsections },
      })

      formTypeSections = update(formTypeSections, {
        $splice: [[militarySectionIndex, 1, newMilitarySection]],
      })
    }

    if (existingConditionsHidden) {
      const psychSectionIndex = formTypeSections.findIndex(s => s.key === sections.PSYCHOLOGICAL)

      if (psychSectionIndex > -1) {
        const psychSection = formTypeSections.find(s => s.key === sections.PSYCHOLOGICAL)
        const psychSubsections = psychSection.subsections
          .filter(s => s.key !== sections.PSYCHOLOGICAL_CONDITIONS)

        const newPsychSection = update(psychSection, {
          subsections: { $set: psychSubsections },
        })

        formTypeSections = update(formTypeSections, {
          $splice: [[psychSectionIndex, 1, newPsychSection]],
        })
      }
    }

    return formTypeSections
  },
)

// Returns form sections in the nested structure
export const nestedFormSectionsSelector = (state, includeReview = false) => {
  let formSections = getFormSections(state)

  if (includeReview) formSections = formSections.concat(formTypeConfig.reviewSections)

  return formSections
}

// Returns flat list of form sections
export const formSectionsSelector = (state, includeReview = false) => {
  let formSections = getFormSections(state)

  if (includeReview) formSections = formSections.concat(formTypeConfig.reviewSections)

  return formTypeConfig.reduceSubsections(formSections)
}
