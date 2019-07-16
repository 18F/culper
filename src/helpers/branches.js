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

export const requireFinancialDelinquentName = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireFinancialDelinquentInfraction = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)


export const allowFinancialDelinquentNonFederal = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireFinancialNonpaymentSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireDrugWhileSafetySection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireDrugWithClearanceSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireAlcoholSections = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireDrugWhileSafety = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireDrugWithClearance = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireDrugInFuture = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireLegalOtherOffensesSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireLegalNonCriminalCourtSection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireLegalTechnologySection = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireLegalOffenseInvolvements = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireLegalOffenseSentenced = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireLegalOffenseIncarcerated = formType => (
  requiredByForms(formType, [formTypes.SF86, formTypes.SF85P])
)

export const requireLegalInvestigationClearanceGranted = formType => (
  requiredByForms(formType, [formTypes.SF85])
)

export const requireForeignCounterIntelligence = formType => (
  requiredByForms(formType, [formTypes.SF86])
)

export const requireForeignExcessiveKnowledge = formType => (
  requiredByForms(formType, [formTypes.SF86])
)

export const requireForeignSensitiveInformation = formType => (
  requiredByForms(formType, [formTypes.SF86])
)

export const requireForeignThreatened = formType => (
  requiredByForms(formType, [formTypes.SF86])
)

export const requireAlcoholOrderedCounselingParty = formType => (
  requiredByForms(formType, [formTypes.SF86])
)
