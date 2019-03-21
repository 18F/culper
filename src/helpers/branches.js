import * as formTypes from 'constants/formTypes'

export const requiredByForms = (formType, forms = []) => (
  forms.includes(formType)
)

export const requireHistoryFederalSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireMultipleCitizenshipRenounced = formType => (
  requiredByForms(formType, [formTypes.SF86])
)

export const requireCitizenshipForeignPassportsSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireForeignMilitaryMaintainsContact = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)
