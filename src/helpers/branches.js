import { createSelector } from 'reselect'
import * as formTypes from 'constants/formTypes'
import { formTypeSelector } from 'selectors/formType'

export const requireMultipleCitizenshipRenounced = (formType) => {
  return formType === formTypes.SF86
}
