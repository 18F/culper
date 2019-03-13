import update from 'immutability-helper'
import { createSelector } from 'reselect'

import { formTypeSelector } from 'selectors/formType'
import * as formTypeConfig from 'config/formTypes'
import * as sections from 'constants/sections'

import { hideSelectiveService } from 'validators/selectiveservice'
import { hideDisciplinaryProcedures } from 'validators/militarydisciplinary'

export const hideSelectiveServiceSelector = (state) => {
  const { application } = state
  return hideSelectiveService(application)
}

export const hideDisciplinaryProceduresSelector = (state) => {
  const { application } = state

  return hideDisciplinaryProcedures(application)
}

const getFormSections = createSelector(
  formTypeSelector,
  hideDisciplinaryProceduresSelector,
  hideSelectiveServiceSelector,
  (formType, disciplinaryProceduresHidden, selectiveServiceHidden) => {
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

    return formTypeSections
  },
)

// Returns form sections in the nested structure
export const nestedFormSectionsSelector = state => getFormSections(state)

// Returns flat list of form sections
export const formSectionsSelector = (state) => {
  const formSections = getFormSections(state)
  return formTypeConfig.reduceSubsections(formSections)
}
