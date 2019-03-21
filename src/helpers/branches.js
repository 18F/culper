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

export const requireForeignContactsSection = formType => (
  requiredByForms(formType, [formTypes.SF86])
)

export const requireForeignActivitiesSection = formType => (
  requiredByForms(formType, [formTypes.SF86])
)

export const requireForeignBusinessSection = formType => (
  requiredByForms(formType, [formTypes.SF86])
)

export const requireForeignTravelSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireFinancialBankruptcySection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireFinancialGamblingSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireFinancialTaxesSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85, formTypes.SF85P])
)

export const requireFinancialCardSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireFinancialCreditSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireFinancialDelinquentSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85, formTypes.SF85P])
)

export const requireFinancialNonpaymentSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)
