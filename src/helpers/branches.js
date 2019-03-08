import * as formTypes from 'constants/formTypes'

export const requireHistoryFederalSection = formType => (
  formType !== formTypes.SF85
)

export const requireMultipleCitizenshipRenounced = formType => (
  formType === formTypes.SF86
)

export const requireCitizenshipForeignPassportsSection = formType => (
  formType !== formTypes.SF85
)
