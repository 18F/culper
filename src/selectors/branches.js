import { createSelector } from 'reselect'

import {
  requireHistoryFederalSection,
  requireMultipleCitizenshipRenounced,
  requireCitizenshipForeignPassportsSection,
  requireForeignMilitaryMaintainsContact,
} from 'helpers/branches'

import { formTypeSelector } from 'selectors/formType'

export const selectHistoryFederalSection = createSelector(
  formTypeSelector,
  formType => (
    {
      requireHistoryFederalSection: requireHistoryFederalSection(formType),
    }
  )
)

export const selectMultipleCitizenshipRenounced = createSelector(
  formTypeSelector,
  formType => (
    {
      requireMultipleCitizenshipRenounced: requireMultipleCitizenshipRenounced(formType),
    }
  )
)

export const selectCitizenshipForeignPassportsSection = createSelector(
  formTypeSelector,
  formType => (
    {
      requireCitizenshipForeignPassportsSection:
        requireCitizenshipForeignPassportsSection(formType),
    }
  )
)

export const selectForeignMilitaryMaintainsContact = createSelector(
  formTypeSelector,
  formType => (
    {
      requireForeignMilitaryMaintainsContact: requireForeignMilitaryMaintainsContact(formType),
    }
  )
)
