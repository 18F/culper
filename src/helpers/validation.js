import * as sections from 'constants/sections'
import * as validators from 'validators'

// Map sections to their validator classes (temporary)
export const getValidatorForSection = (section) => {
  switch (section) {
    case sections.IDENTIFICATION_NAME:
      return validators.IdentificationNameValidator

    case sections.IDENTIFICATION_BIRTH_DATE:
      return validators.IdentificationBirthDateValidator

    case sections.IDENTIFICATION_BIRTH_PLACE:
      return validators.IdentificationBirthPlaceValidator

    case sections.IDENTIFICATION_SSN:
      return validators.IdentificationSSNValidator

    case sections.IDENTIFICATION_OTHER_NAMES:
      return validators.IdentificationOtherNamesValidator

    case sections.IDENTIFICATION_CONTACTS:
      return validators.IdentificationContactInformationValidator

    case sections.IDENTIFICATION_PHYSICAL:
      return validators.IdentificationPhysicalValidator

    case sections.HISTORY_RESIDENCE:
      return validators.HistoryResidenceValidator

    case sections.HISTORY_EMPLOYMENT:
      return validators.HistoryEmploymentValidator

    case sections.HISTORY_EDUCATION:
      return validators.HistoryEducationValidator

    case sections.HISTORY_FEDERAL:
      return validators.FederalServiceValidator

    case sections.RELATIONSHIPS_STATUS_MARITAL:
      return validators.MaritalValidator

    case sections.RELATIONSHIPS_STATUS_COHABITANTS:
      return validators.CohabitantsValidator

    case sections.RELATIONSHIPS_PEOPLE:
      return validators.PeopleValidator

    case sections.RELATIONSHIPS_RELATIVES:
      return validators.RelativesValidator

    case sections.CITIZENSHIP_US_PASSPORT:
      return validators.PassportValidator

    case sections.CITIZENSHIP_STATUS:
      return validators.CitizenshipValidator

    case sections.CITIZENSHIP_MULTIPLE:
      return validators.CitizenshipMultipleValidator

    case sections.CITIZENSHIP_PASSPORTS:
      return validators.CitizenshipPassportsValidator

    case sections.MILITARY_SELECTIVE:
      return validators.SelectiveServiceValidator

    case sections.MILITARY_HISTORY:
      return validators.MilitaryHistoryValidator

    case sections.MILITARY_DISCIPLINARY:
      return validators.MilitaryDisciplinaryValidator

    case sections.MILITARY_FOREIGN:
      return validators.MilitaryForeignValidator

    case sections.FOREIGN_CONTACTS:
      return validators.ForeignContactsValidator

    case sections.FOREIGN_ACTIVITIES_DIRECT:
      return validators.ForeignDirectActivityValidator

    case sections.FOREIGN_ACTIVITIES_INDIRECT:
      return validators.ForeignIndirectActivityValidator

    case sections.FOREIGN_ACTIVITIES_REAL_ESTATE:
      return validators.ForeignRealEstateActivityValidator

    case sections.FOREIGN_ACTIVITIES_BENEFITS:
      return validators.ForeignBenefitActivityValidator

    case sections.FOREIGN_ACTIVITIES_SUPPORT:
      return validators.ForeignActivitiesSupportValidator

    case sections.FOREIGN_BUSINESS_ADVICE:
      return validators.ForeignBusinessAdviceValidator

    case sections.FOREIGN_BUSINESS_FAMILY:
      return validators.ForeignBusinessFamilyValidator

    case sections.FOREIGN_BUSINESS_EMPLOYMENT:
      return validators.ForeignBusinessEmploymentValidator

    case sections.FOREIGN_BUSINESS_VENTURES:
      return validators.ForeignBusinessVenturesValidator

    case sections.FOREIGN_BUSINESS_CONFERENCES:
      return validators.ForeignBusinessConferencesValidator

    case sections.FOREIGN_BUSINESS_CONTACT:
      return validators.ForeignBusinessContactValidator

    case sections.FOREIGN_BUSINESS_SPONSORSHIP:
      return validators.ForeignBusinessSponsorshipValidator

    case sections.FOREIGN_BUSINESS_POLITICAL:
      return validators.ForeignBusinessPoliticalValidator

    case sections.FOREIGN_BUSINESS_VOTING:
      return validators.ForeignBusinessVotingValidator

    case sections.FOREIGN_TRAVEL:
      return validators.ForeignTravelValidator

    case sections.FINANCIAL_BANKRUPTCY:
      return validators.BankruptcyValidator

    case sections.FINANCIAL_GAMBLING:
      return validators.GamblingValidator

    case sections.FINANCIAL_TAXES:
      return validators.TaxesValidator

    case sections.FINANCIAL_CARD:
      return validators.CardAbuseValidator

    case sections.FINANCIAL_CREDIT:
      return validators.CreditValidator

    case sections.FINANCIAL_DELINQUENT:
      return validators.DelinquentValidator

    case sections.FINANCIAL_NONPAYMENT:
      return validators.NonpaymentValidator

    case sections.SUBSTANCE_USE_DRUGS_USAGE:
      return validators.DrugUsesValidator

    case sections.SUBSTANCE_USE_DRUGS_PURCHASE:
      return validators.DrugInvolvementsValidator

    case sections.SUBSTANCE_USE_DRUGS_CLEARANCE:
      return validators.DrugClearanceUsesValidator

    case sections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY:
      return validators.DrugPublicSafetyUsesValidator

    case sections.SUBSTANCE_USE_DRUGS_MISUSE:
      return validators.DrugPrescriptionUsesValidator

    case sections.SUBSTANCE_USE_DRUGS_ORDERED:
      return validators.DrugOrderedTreatmentsValidator

    case sections.SUBSTANCE_USE_DRUGS_VOLUNTARY:
      return validators.DrugVoluntaryTreatmentsValidator

    case sections.SUBSTANCE_USE_ALCOHOL_NEGATIVE:
      return validators.AlcoholNegativeImpactsValidator

    case sections.SUBSTANCE_USE_ALCOHOL_ORDERED:
      return validators.AlcoholOrderedCounselingsValidator

    case sections.SUBSTANCE_USE_ALCOHOL_VOLUNTARY:
      return validators.AlcoholVoluntaryCounselingsValidator

    case sections.SUBSTANCE_USE_ALCOHOL_ADDITIONAL:
      return validators.AlcoholReceivedCounselingsValidator

    case sections.LEGAL_POLICE_OFFENSES:
      return validators.PoliceOffensesValidator

    case sections.LEGAL_POLICE_ADDITIONAL_OFFENSES:
      return validators.PoliceOtherOffensesValidator

    case sections.LEGAL_POLICE_DOMESTIC_VIOLENCE:
      return validators.DomesticViolenceValidator

    case sections.LEGAL_INVESTIGATIONS_HISTORY:
      return validators.LegalInvestigationsHistoryValidator

    case sections.LEGAL_INVESTIGATIONS_REVOKED:
      return validators.LegalInvestigationsRevokedValidator

    case sections.LEGAL_INVESTIGATIONS_DEBARRED:
      return validators.LegalInvestigationsDebarredValidator

    case sections.LEGAL_COURT:
      return validators.LegalNonCriminalCourtActionsValidator

    case sections.LEGAL_TECHNOLOGY_UNAUTHORIZED:
      return validators.LegalTechnologyUnauthorizedValidator

    case sections.LEGAL_TECHNOLOGY_MANIPULATING:
      return validators.LegalTechnologyManipulatingValidator

    case sections.LEGAL_TECHNOLOGY_UNLAWFUL:
      return validators.LegalTechnologyUnlawfulValidator

    case sections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION:
      return validators.LegalAssociationsTerroristValidator

    case sections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM:
      return validators.LegalAssociationsEngagedValidator

    case sections.LEGAL_ASSOCIATIONS_ADVOCATING:
      return validators.LegalAssociationsAdvocatingValidator

    case sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW:
      return validators.LegalAssociationsOverthrowValidator

    case sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE:
      return validators.LegalAssociationsViolenceValidator

    case sections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW:
      return validators.LegalAssociationsActivitiesValidator

    case sections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION:
      return validators.LegalAssociationsTerrorismValidator

    case sections.PSYCHOLOGICAL_COMPETENCE:
      return validators.CompetenceValidator

    case sections.PSYCHOLOGICAL_CONSULTATIONS:
      return validators.ConsultationValidator

    case sections.PSYCHOLOGICAL_HOSPITALIZATIONS:
      return validators.HospitalizationsValidator

    case sections.PSYCHOLOGICAL_DIAGNOSES:
      return validators.DiagnosesValidator

    case sections.PSYCHOLOGICAL_CONDITIONS:
      return validators.ExistingConditionsValidator

    default:
      console.warn(`Validator for ${section} section not found`)
      return null
  }
}

export const validateSection = ({ key, data }) => {
  const Validator = getValidatorForSection(key)

  if (Validator) {
    return new Validator(data).isValid()
  }

  return false
}

export const sectionIsValid = (formSections = []) => (
  formSections.every((s) => {
    if (s.subsections) return sectionIsValid(s.subsections)
    return s.isValid === true
  })
)

export const sectionIsInvalid = (formSections = []) => (
  formSections.some((s) => {
    if (s.subsections) return sectionIsInvalid(s.subsections)
    return s.isValid === false
  })
)

export const validateCollection = (items, validator) => (
  items && items.length > 0 && items.every(i => i.Item && validator(i.Item))
)
