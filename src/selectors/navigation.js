import { createSelector } from 'reselect'

import { formTypeSelector } from '@selectors/formType'
import * as formTypeConfig from '@config/formTypes'
import * as sections from '@constants/sections'

import { hideSelectiveService } from '@validators/selectiveservice'
import { hideDisciplinaryProcedures } from '@validators/militarydisciplinary'

const hideSelectiveServiceSelector = state => {
  const { application } = state

  return hideSelectiveService(application)
}

const hideDisciplinaryProceduresSelector = state => {
  const { application } = state

  return hideDisciplinaryProcedures(application)
}

export const formSectionsSelector = createSelector(
  formTypeSelector,
  hideDisciplinaryProceduresSelector,
  hideSelectiveServiceSelector,
  (formType, hideDisciplinaryProcedures, hideSelectiveService) => {
    // Make a copy b/c we are going to mutate this
    // Might want to add & use update here to make this easier
    const formTypeSections = [ ...formTypeConfig[formType] ]

    if (hideDisciplinaryProcedures) {
      const militarySection = formTypeSections
        .find(s => s.key === sections.MILITARY)

      const newMilitarySection = {
        ...militarySection,
        subsections: militarySection.subsections.filter(s => s.key !== sections.MILITARY_DISCIPLINARY)
      }

      formTypeSections[3] = newMilitarySection
    }
    if (hideSelectiveService) {
      const militarySection = formTypeSections
        .find(s => s.key === sections.MILITARY)

      const newMilitarySection = {
        ...militarySection,
        subsections: militarySection.subsections.filter(s => s.key !== sections.MILITARY_SELECTIVE)
      }

      formTypeSections[3] = newMilitarySection
    }

    return formTypeSections
  }
)
