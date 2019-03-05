import { createSelector } from 'reselect'

import {
  requireHistoryFederalSection,
  requireMultipleCitizenshipRenounced,
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
