import { createSelector } from 'reselect'

import { requireMultipleCitizenshipRenounced } from 'helpers/branches'

import { formTypeSelector } from 'selectors/formType'

export const selectMultipleCitizenshipRenounced = createSelector(
  formTypeSelector,
  formType => (
    {
      requireMultipleCitizenshipRenounced: requireMultipleCitizenshipRenounced(formType),
    }
  )
)

export const otherThing = ''
