/* eslint-disable max-len */
/* eslint import/no-cycle: 0 */

import { SF86 } from 'constants/formTypes'
import * as sections from 'constants/sections'
import * as formConfig from 'config/forms'

import { validateModel } from 'models/validate'
import {
  requireRelationshipMaritalForeignBornDocExpiration,
  requireRelationshipMaritalDivorcePhoneNumber,
  requireMultipleCitizenshipRenounced,
  requireForeignMilitaryMaintainsContact,
  requireForeignCounterIntelligence,
  requireForeignExcessiveKnowledge,
  requireForeignSensitiveInformation,
  requireForeignThreatened,
  requireFinancialCardDisciplinaryDate,
  requireFinancialDelinquentName,
  requireFinancialDelinquentInfraction,
  requireDrugWhileSafety,
  requireDrugWithClearance,
  requireDrugInFuture,
  requireAlcoholOrderedCounselingParty,
  requireLegalOffenseInvolvements,
  requireLegalOffenseSentenced,
  requireLegalOffenseIncarcerated,
  requireLegalPoliceFirearms,
  requireLegalPoliceDrugs,
  requireLegalInvestigationClearanceGranted,
} from 'helpers/branches'

// IDENTIFICATION
import identificationName from 'models/sections/identificationName'
import identificationDateOfBirth from 'models/sections/identificationDateOfBirth'
import identificationPlaceOfBirth from 'models/sections/identificationPlaceOfBirth'
import identificationSSN from 'models/sections/identificationSSN'
import identificationOtherNames from 'models/sections/identificationOtherNames'
import identificationContactInfo from 'models/sections/identificationContactInfo'
import identificationPhysical from 'models/sections/identificationPhysical'

// HISTORY
import historyResidence from 'models/sections/historyResidence'
import historyEmployment from 'models/sections/historyEmployment'
import historyEducation from 'models/sections/historyEducation'
import historyFederal from 'models/sections/historyFederalService'

// RELATIONSHIPS
import relationshipsMaritalModel from 'models/sections/relationshipsMarital'
import relationshipsCohabitantsModel from 'models/sections/relationshipsCohabitants'
import relationshipsPeopleModel from 'models/sections/relationshipsPeople'
import relationshipsRelativesModel from 'models/sections/relationshipsRelatives'

// CITIZENSHIP
import usPassport from 'models/usPassport'
import citizenshipStatus from 'models/citizenshipStatus'
import citizenshipMultiple from 'models/sections/citizenshipMultiple'
import citizenshipPassports from 'models/sections/citizenshipPassports'

// MILITARY
import selectiveService from 'models/selectiveService'
import militaryHistory from 'models/militaryHistory'
import militaryDisciplinary from 'models/sections/militaryDisciplinary'
import militaryForeign from 'models/sections/militaryForeign'

// FOREIGN
import foreignContacts from 'models/sections/foreignContacts'
import foreignDirectActivity from 'models/sections/foreignDirectActivity'
import foreignIndirectActivity from 'models/sections/foreignIndirectActivity'
import foreignRealEstateActivity from 'models/sections/foreignRealEstateActivity'
import foreignBenefitActivity from 'models/sections/foreignBenefitActivity'
import foreignSupport from 'models/sections/foreignSupport'
import foreignBusinessAdvice from 'models/sections/foreignBusinessAdvice'
import foreignBusinessFamily from 'models/sections/foreignBusinessFamily'
import foreignBusinessEmployment from 'models/sections/foreignBusinessEmployment'
import foreignBusinessVentures from 'models/sections/foreignBusinessVentures'
import foreignBusinessConferences from 'models/sections/foreignBusinessConferences'
import foreignBusinessContact from 'models/sections/foreignBusinessContact'
import foreignBusinessSponsorship from 'models/sections/foreignBusinessSponsorship'
import foreignBusinessPolitical from 'models/sections/foreignBusinessPolitical'
import foreignBusinessVoting from 'models/sections/foreignBusinessVoting'
import foreignTravel from 'models/sections/foreignTravel'

// FINANCIAL
import financialBankruptcy from 'models/sections/financialBankruptcy'
import financialGambling from 'models/sections/financialGambling'
import financialTaxes from 'models/sections/financialTaxes'
import financialCardAbuse from 'models/sections/financialCardAbuse'
import financialCredit from 'models/sections/financialCredit'
import financialDelinquent from 'models/sections/financialDelinquent'
import financialNonPayment from 'models/sections/financialNonPayment'

// SUBSTANCE
import substanceDrugUsesModel from 'models/sections/substanceDrugUses'
import substanceDrugInvolvementsModel from 'models/sections/substanceDrugInvolvements'
import substanceDrugClearanceUsesModel from 'models/sections/substanceDrugClearanceUses'
import substanceDrugPublicSafetyUsesModel from 'models/sections/substanceDrugPublicSafetyUses'
import substanceDrugPrescriptionUsesModel from 'models/sections/substanceDrugPrescriptionUses'
import substanceDrugOrderedTreatmentsModel from 'models/sections/substanceDrugOrderedTreatments'
import substanceDrugVoluntaryTreatmentsModel from 'models/sections/substanceDrugVoluntaryTreatments'
import substanceAlcoholNegativeImpactsModel from 'models/sections/substanceAlcoholNegativeImpacts'
import substanceAlcoholOrderedCounselingModel from 'models/sections/substanceAlcoholOrderedCounseling'
import substanceAlcoholVoluntaryCounselingModel from 'models/sections/substanceAlcoholVoluntaryCounseling'
import substanceAlcoholReceivedCounselingModel from 'models/sections/substanceAlcoholReceivedCounseling'

// LEGAL
import legalPoliceOffenses from 'models/sections/legalPoliceOffenses'
import legalPoliceOtherOffenses from 'models/sections/legalPoliceOtherOffenses'
import legalDomesticViolence from 'models/sections/legalDomesticViolence'
import legalInvestigationsHistory from 'models/sections/legalInvestigationsHistory'
import legalInvestigationsRevoked from 'models/sections/legalInvestigationsRevoked'
import legalInvestigationsDebarred from 'models/sections/legalInvestigationsDebarred'
import legalNonCriminalCourtActions from 'models/sections/legalNonCriminalCourtActions'
import legalTechnologyUnauthorized from 'models/sections/legalTechnologyUnauthorized'
import legalTechnologyManipulating from 'models/sections/legalTechnologyManipulating'
import legalTechnologyUnlawful from 'models/sections/legalTechnologyUnlawful'
import legalAssociationsTerrorist from 'models/sections/legalAssociationsTerrorist'
import legalAssociationsEngaged from 'models/sections/legalAssociationsEngaged'
import legalAssociationsAdvocating from 'models/sections/legalAssociationsAdvocating'
import legalAssociationsOverthrow from 'models/sections/legalAssociationsOverthrow'
import legalAssociationsViolence from 'models/sections/legalAssociationsViolence'
import legalAssociationsActivities from 'models/sections/legalAssociationsActivities'
import terrorism from 'models/terrorism'

// PSYCHOLOGICAL
import competence from 'models/competence'
import consultation from 'models/consultation'
import hospitalization from 'models/sections/hospitalization'
import diagnoses from 'models/diagnoses'
import existingConditions from 'models/existingConditions'

// PACKAGE
import packageComments from 'models/sections/packageComments'

// Map sections to their validator classes (temporary)
export const getValidatorForSection = (section) => {
  switch (section) {
    case sections.IDENTIFICATION_NAME:
      return identificationName

    case sections.IDENTIFICATION_BIRTH_DATE:
      return identificationDateOfBirth

    case sections.IDENTIFICATION_BIRTH_PLACE:
      return identificationPlaceOfBirth

    case sections.IDENTIFICATION_SSN:
      return identificationSSN

    case sections.IDENTIFICATION_OTHER_NAMES:
      return identificationOtherNames

    case sections.IDENTIFICATION_CONTACTS:
      return identificationContactInfo

    case sections.IDENTIFICATION_PHYSICAL:
      return identificationPhysical

    case sections.HISTORY_RESIDENCE:
      return historyResidence

    case sections.HISTORY_EMPLOYMENT:
      return historyEmployment

    case sections.HISTORY_EDUCATION:
      return historyEducation

    case sections.HISTORY_FEDERAL:
      return historyFederal

    case sections.RELATIONSHIPS_STATUS_MARITAL:
      return relationshipsMaritalModel

    case sections.RELATIONSHIPS_STATUS_COHABITANTS:
      return relationshipsCohabitantsModel

    case sections.RELATIONSHIPS_PEOPLE:
      return relationshipsPeopleModel

    case sections.RELATIONSHIPS_RELATIVES:
      return relationshipsRelativesModel

    case sections.CITIZENSHIP_US_PASSPORT:
      return usPassport

    case sections.CITIZENSHIP_STATUS:
      return citizenshipStatus

    case sections.CITIZENSHIP_MULTIPLE:
      return citizenshipMultiple

    case sections.CITIZENSHIP_PASSPORTS:
      return citizenshipPassports

    case sections.MILITARY_SELECTIVE:
      return selectiveService

    case sections.MILITARY_HISTORY:
      return militaryHistory

    case sections.MILITARY_DISCIPLINARY:
      return militaryDisciplinary

    case sections.MILITARY_FOREIGN:
      return militaryForeign

    case sections.FOREIGN_CONTACTS:
      return foreignContacts

    case sections.FOREIGN_ACTIVITIES_DIRECT:
      return foreignDirectActivity

    case sections.FOREIGN_ACTIVITIES_INDIRECT:
      return foreignIndirectActivity

    case sections.FOREIGN_ACTIVITIES_REAL_ESTATE:
      return foreignRealEstateActivity

    case sections.FOREIGN_ACTIVITIES_BENEFITS:
      return foreignBenefitActivity

    case sections.FOREIGN_ACTIVITIES_SUPPORT:
      return foreignSupport

    case sections.FOREIGN_BUSINESS_ADVICE:
      return foreignBusinessAdvice

    case sections.FOREIGN_BUSINESS_FAMILY:
      return foreignBusinessFamily

    case sections.FOREIGN_BUSINESS_EMPLOYMENT:
      return foreignBusinessEmployment

    case sections.FOREIGN_BUSINESS_VENTURES:
      return foreignBusinessVentures

    case sections.FOREIGN_BUSINESS_CONFERENCES:
      return foreignBusinessConferences

    case sections.FOREIGN_BUSINESS_CONTACT:
      return foreignBusinessContact

    case sections.FOREIGN_BUSINESS_SPONSORSHIP:
      return foreignBusinessSponsorship

    case sections.FOREIGN_BUSINESS_POLITICAL:
      return foreignBusinessPolitical

    case sections.FOREIGN_BUSINESS_VOTING:
      return foreignBusinessVoting

    case sections.FOREIGN_TRAVEL:
      return foreignTravel

    case sections.FINANCIAL_BANKRUPTCY:
      return financialBankruptcy

    case sections.FINANCIAL_GAMBLING:
      return financialGambling

    case sections.FINANCIAL_TAXES:
      return financialTaxes

    case sections.FINANCIAL_CARD:
      return financialCardAbuse

    case sections.FINANCIAL_CREDIT:
      return financialCredit

    case sections.FINANCIAL_DELINQUENT:
      return financialDelinquent

    case sections.FINANCIAL_NONPAYMENT:
      return financialNonPayment

    case sections.SUBSTANCE_USE_DRUGS_USAGE:
      return substanceDrugUsesModel

    case sections.SUBSTANCE_USE_DRUGS_PURCHASE:
      return substanceDrugInvolvementsModel

    case sections.SUBSTANCE_USE_DRUGS_CLEARANCE:
      return substanceDrugClearanceUsesModel

    case sections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY:
      return substanceDrugPublicSafetyUsesModel

    case sections.SUBSTANCE_USE_DRUGS_MISUSE:
      return substanceDrugPrescriptionUsesModel

    case sections.SUBSTANCE_USE_DRUGS_ORDERED:
      return substanceDrugOrderedTreatmentsModel

    case sections.SUBSTANCE_USE_DRUGS_VOLUNTARY:
      return substanceDrugVoluntaryTreatmentsModel

    case sections.SUBSTANCE_USE_ALCOHOL_NEGATIVE:
      return substanceAlcoholNegativeImpactsModel

    case sections.SUBSTANCE_USE_ALCOHOL_ORDERED:
      return substanceAlcoholOrderedCounselingModel

    case sections.SUBSTANCE_USE_ALCOHOL_VOLUNTARY:
      return substanceAlcoholVoluntaryCounselingModel

    case sections.SUBSTANCE_USE_ALCOHOL_ADDITIONAL:
      return substanceAlcoholReceivedCounselingModel

    case sections.LEGAL_POLICE_OFFENSES:
      return legalPoliceOffenses

    case sections.LEGAL_POLICE_ADDITIONAL_OFFENSES:
      return legalPoliceOtherOffenses

    case sections.LEGAL_POLICE_DOMESTIC_VIOLENCE:
      return legalDomesticViolence

    case sections.LEGAL_INVESTIGATIONS_HISTORY:
      return legalInvestigationsHistory

    case sections.LEGAL_INVESTIGATIONS_REVOKED:
      return legalInvestigationsRevoked

    case sections.LEGAL_INVESTIGATIONS_DEBARRED:
      return legalInvestigationsDebarred

    case sections.LEGAL_COURT:
      return legalNonCriminalCourtActions

    case sections.LEGAL_TECHNOLOGY_UNAUTHORIZED:
      return legalTechnologyUnauthorized

    case sections.LEGAL_TECHNOLOGY_MANIPULATING:
      return legalTechnologyManipulating

    case sections.LEGAL_TECHNOLOGY_UNLAWFUL:
      return legalTechnologyUnlawful

    case sections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION:
      return legalAssociationsTerrorist

    case sections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM:
      return legalAssociationsEngaged

    case sections.LEGAL_ASSOCIATIONS_ADVOCATING:
      return legalAssociationsAdvocating

    case sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW:
      return legalAssociationsOverthrow

    case sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE:
      return legalAssociationsViolence

    case sections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW:
      return legalAssociationsActivities

    case sections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION:
      return terrorism

    case sections.PSYCHOLOGICAL_COMPETENCE:
      return competence

    case sections.PSYCHOLOGICAL_CONSULTATIONS:
      return consultation

    case sections.PSYCHOLOGICAL_HOSPITALIZATIONS:
      return hospitalization

    case sections.PSYCHOLOGICAL_DIAGNOSES:
      return diagnoses

    case sections.PSYCHOLOGICAL_CONDITIONS:
      return existingConditions

    case sections.REVIEW_AND_SUBMIT_COMMENTS:
      return packageComments

    default:
      console.warn(`Validator for ${section} section not found`)
      return null
  }
}

export const getValidationOptionsForForm = (formType, key, options) => {
  const validatorOptions = {}

  switch (key) {
    case sections.HISTORY_RESIDENCE:
      validatorOptions.requireYears = formConfig[formType].HISTORY_RESIDENCE_YEARS
      break
    case sections.HISTORY_EMPLOYMENT:
      validatorOptions.requireYears = formConfig[formType].HISTORY_EMPLOYMENT_YEARS
      break
    case sections.RELATIONSHIPS_STATUS_MARITAL:
      validatorOptions.requireForeignBornDocExpiration = requireRelationshipMaritalForeignBornDocExpiration(formType)
      validatorOptions.requireRelationshipMaritalDivorcePhoneNumber = requireRelationshipMaritalDivorcePhoneNumber(formType)
      break
    case sections.CITIZENSHIP_STATUS:
      validatorOptions.requireForeignBornDocumentation = !options.hasValidUSPassport
      break
    case sections.CITIZENSHIP_MULTIPLE:
      validatorOptions.requireCitizenshipRenounced = requireMultipleCitizenshipRenounced(formType)
      break
    case sections.MILITARY_FOREIGN:
      validatorOptions.requireForeignMilitaryMaintainsContact = requireForeignMilitaryMaintainsContact(formType)
      break
    case sections.FOREIGN_TRAVEL:
      validatorOptions.requireForeignCounterIntelligence = requireForeignCounterIntelligence(formType)
      validatorOptions.requireForeignExcessiveKnowledge = requireForeignExcessiveKnowledge(formType)
      validatorOptions.requireForeignSensitiveInformation = requireForeignSensitiveInformation(formType)
      validatorOptions.requireForeignThreatened = requireForeignThreatened(formType)
      break
    case sections.FINANCIAL_CARD:
      validatorOptions.requireFinancialCardDisciplinaryDate = requireFinancialCardDisciplinaryDate(formType)
      break
    case sections.FINANCIAL_DELINQUENT:
      validatorOptions.requiredFinancialDelinquentName = requireFinancialDelinquentName(formType)
      validatorOptions.requiredFinancialDelinquentInfraction = requireFinancialDelinquentInfraction(formType)
      break
    case sections.SUBSTANCE_USE_DRUGS_USAGE:
      validatorOptions.requireUseWhileEmployed = requireDrugWhileSafety(formType)
      validatorOptions.requireUseWithClearance = requireDrugWithClearance(formType)
      validatorOptions.requireUseInFuture = requireDrugInFuture(formType)
      break
    case sections.SUBSTANCE_USE_DRUGS_PURCHASE:
      validatorOptions.requireInvolvementWhileEmployed = requireDrugWhileSafety(formType)
      validatorOptions.requireInvolvementWithClearance = requireDrugWithClearance(formType)
      validatorOptions.requireInvolvementInFuture = requireDrugInFuture(formType)
      break
    case sections.SUBSTANCE_USE_DRUGS_MISUSE:
      validatorOptions.requireUseWhileEmployed = requireDrugWhileSafety(formType)
      validatorOptions.requireUseWithClearance = requireDrugWithClearance(formType)
      break
    case sections.SUBSTANCE_USE_ALCOHOL_ORDERED:
      validatorOptions.requireAlcoholOrderedCounselingParty = requireAlcoholOrderedCounselingParty(formType)
      break
    case sections.LEGAL_POLICE_OFFENSES:
      validatorOptions.requireLegalOffenseInvolvements = requireLegalOffenseInvolvements(formType)
      validatorOptions.requireLegalOffenseSentenced = requireLegalOffenseSentenced(formType)
      validatorOptions.requireLegalOffenseIncarcerated = requireLegalOffenseIncarcerated(formType)
      break
    case sections.LEGAL_POLICE_ADDITIONAL_OFFENSES:
      validatorOptions.requireLegalPoliceFirearms = requireLegalPoliceFirearms(formType)
      validatorOptions.requireLegalPoliceDrugs = requireLegalPoliceDrugs(formType)
      break
    case sections.LEGAL_INVESTIGATIONS_HISTORY:
      validatorOptions.requireLegalInvestigationClearanceGranted = requireLegalInvestigationClearanceGranted(formType)
      break
    default:
  }

  return validatorOptions
}

export const validateSection = ({ key = '', data = {}, options = {} }, formType = SF86) => {
  const validationModel = getValidatorForSection(key)
  const formOptions = getValidationOptionsForForm(formType, key, options)

  if (validationModel) {
    try {
      return validateModel(data, validationModel, { ...formOptions, ...options })
      // return validator(data, formType, options)
    } catch (e) {
      console.warn(`Invalid validator for section ${key}`, e)
    }
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
