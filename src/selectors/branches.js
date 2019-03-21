import { createSelector } from 'reselect'

import {
  requireHistoryFederalSection,
  requireMultipleCitizenshipRenounced,
  requireCitizenshipForeignPassportsSection,
  requireForeignMilitaryMaintainsContact,
  requireForeignContactsSection,
  requireForeignActivitiesSection,
  requireForeignBusinessSection,
  requireForeignTravelSection,
} from 'helpers/branches'

import { formTypeSelector } from 'selectors/formType'

export const selectHistoryFederalSection = createSelector(formTypeSelector,
  formType => ({ requireHistoryFederalSection: requireHistoryFederalSection(formType) }))

export const selectMultipleCitizenshipRenounced = createSelector(formTypeSelector,
  formType => ({
    requireMultipleCitizenshipRenounced: requireMultipleCitizenshipRenounced(formType),
  }))

export const selectCitizenshipForeignPassportsSection = createSelector(formTypeSelector,
  formType => ({
    requireCitizenshipForeignPassportsSection:
      requireCitizenshipForeignPassportsSection(formType),
  }))

export const selectForeignMilitaryMaintainsContact = createSelector(formTypeSelector,
  formType => ({
    requireForeignMilitaryMaintainsContact: requireForeignMilitaryMaintainsContact(formType),
  }))

export const selectForeignContactsSection = createSelector(formTypeSelector,
  formType => ({ requireForeignContactsSection: requireForeignContactsSection(formType) }))

export const selectForeignActivitiesSection = createSelector(formTypeSelector,
  formType => ({ requireForeignActivitiesSection: requireForeignActivitiesSection(formType) }))

export const selectForeignBusinessSection = createSelector(formTypeSelector,
  formType => ({ requireForeignBusinessSection: requireForeignBusinessSection(formType) }))

export const selectForeignTravelSection = createSelector(formTypeSelector,
  formType => ({ requireForeignTravelSection: requireForeignTravelSection(formType) }))
