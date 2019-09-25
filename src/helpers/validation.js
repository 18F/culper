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
import { validateForeignContacts } from 'validators/foreigncontacts'
import { validateForeignDirectActivity } from 'validators/foreigndirectactivity'
import { validateForeignIndirectActivity } from 'validators/foreignindirectactivity'
import { validateForeignRealEstateActivity } from 'validators/foreignrealestateactivity'
import { validateForeignBenefitActivity } from 'validators/foreignbenefitactivity'
import { validateForeignActivitiesSupport } from 'validators/foreignsupport'
import { validateForeignBusinessAdvice } from 'validators/foreignbusinessadvice'
import { validateForeignBusinessFamily } from 'validators/foreignbusinessfamily'
import { validateForeignBusinessEmployment } from 'validators/foreignbusinessemployment'
import { validateForeignBusinessVentures } from 'validators/foreignbusinessventures'
import { validateForeignBusinessConferences } from 'validators/foreignbusinessconferences'
import { validateForeignBusinessContacts } from 'validators/foreignbusinesscontact'
import { validateForeignBusinessSponsorship } from 'validators/foreignbusinesssponsorship'
import { validateForeignBusinessPolitical } from 'validators/foreignbusinesspolitical'
import { validateForeignBusinessVoting } from 'validators/foreignbusinessvoting'
import { validateForeignTravel } from 'validators/foreigntravel'
// FINANCIAL
import { validateFinancialBankruptcy } from 'validators/bankruptcy'
import { validateFinancialGambling } from 'validators/gambling'
import { validateFinancialTaxes } from 'validators/taxes'
import { validateFinancialCardAbuse } from 'validators/cardabuse'
import { validateFinancialCredit } from 'validators/credit'
import { validateFinancialDelinquent } from 'validators/delinquent'
import { validateFinancialNonpayment } from 'validators/nonpayment'
// SUBSTANCE
import { validateDrugUses } from 'validators/druguses'
import { validateDrugInvolvements } from 'validators/druginvolvements'
import { validateDrugClearanceUses } from 'validators/drugclearanceuses'
import { validateDrugSafetyUses } from 'validators/drugpublicsafetyuses'
import { validateDrugPrescriptionUses } from 'validators/drugprescriptionuses'
import { validateDrugOrderedTreatments } from 'validators/drugorderedtreatments'
import { validateDrugVoluntaryTreatments } from 'validators/drugvoluntarytreatments'
import { validateNegativeImpacts } from 'validators/alcoholnegativeimpact'
import { validateOrderedCounselings } from 'validators/alcoholorderedcounseling'
import { validateVoluntaryCounselings } from 'validators/alcoholvoluntarycounseling'
import { validateReceivedCounselings } from 'validators/alcoholreceivedcounseling'
// LEGAL
import { validatePoliceOffenses } from 'validators/policeoffenses'
import { validatePoliceOtherOffenses } from 'validators/policeotheroffenses'
import { validateDomesticViolence } from 'validators/domesticviolence'
import { validateLegalInvestigationsHistory } from 'validators/legalinvestigationshistory'
import { validateLegalInvestigationsRevoked } from 'validators/legalinvestigationsrevoked'
import { validateLegalInvestigationsDebarred } from 'validators/legalinvestigationsdebarred'
import { validateLegalNonCriminalCourtActions } from 'validators/legalnoncriminalcourtactions'
import { validateLegalTechnologyUnauthorized } from 'validators/legaltechnologyunauthorized'
import { validateLegalTechnologyManipulating } from 'validators/legaltechnologymanipulating'
import { validateLegalTechnologyUnlawful } from 'validators/legaltechnologyunlawful'
import { validateLegalTerrorist } from 'validators/legalassociationsterrorist'
import { validateLegalAssociationEngaged } from 'validators/legalassociationsengaged'
import { validateLegalAssociationAdvocate } from 'validators/legalassociationsadvocating'
import { validateLegalOverthrow } from 'validators/legalassociationsoverthrow'
import { validateLegalViolence } from 'validators/legalassociationsviolence'
import { validateLegalAssociationActivities } from 'validators/legalassociationsactivities'
import { validateLegalAssociationTerrorism } from 'validators/legalassociationsterrorism'
// PSYCHOLOGICAL
import { validateCompetence } from 'validators/competence'
import { validateConsultations } from 'validators/consultation'
import { validateHospitalizations } from 'validators/hospitalization'
import { validateDiagnoses } from 'validators/diagnoses'
import { validateExistingConditions } from 'validators/existingconditions'
// PACKAGE
import validatePackageComments from 'validators/packagecomments'

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
      return validateForeignContacts

    case sections.FOREIGN_ACTIVITIES_DIRECT:
      return validateForeignDirectActivity

    case sections.FOREIGN_ACTIVITIES_INDIRECT:
      return validateForeignIndirectActivity

    case sections.FOREIGN_ACTIVITIES_REAL_ESTATE:
      return validateForeignRealEstateActivity

    case sections.FOREIGN_ACTIVITIES_BENEFITS:
      return validateForeignBenefitActivity

    case sections.FOREIGN_ACTIVITIES_SUPPORT:
      return validateForeignActivitiesSupport

    case sections.FOREIGN_BUSINESS_ADVICE:
      return validateForeignBusinessAdvice

    case sections.FOREIGN_BUSINESS_FAMILY:
      return validateForeignBusinessFamily

    case sections.FOREIGN_BUSINESS_EMPLOYMENT:
      return validateForeignBusinessEmployment

    case sections.FOREIGN_BUSINESS_VENTURES:
      return validateForeignBusinessVentures

    case sections.FOREIGN_BUSINESS_CONFERENCES:
      return validateForeignBusinessConferences

    case sections.FOREIGN_BUSINESS_CONTACT:
      return validateForeignBusinessContacts

    case sections.FOREIGN_BUSINESS_SPONSORSHIP:
      return validateForeignBusinessSponsorship

    case sections.FOREIGN_BUSINESS_POLITICAL:
      return validateForeignBusinessPolitical

    case sections.FOREIGN_BUSINESS_VOTING:
      return validateForeignBusinessVoting

    case sections.FOREIGN_TRAVEL:
      return validateForeignTravel

    case sections.FINANCIAL_BANKRUPTCY:
      return validateFinancialBankruptcy

    case sections.FINANCIAL_GAMBLING:
      return validateFinancialGambling

    case sections.FINANCIAL_TAXES:
      return validateFinancialTaxes

    case sections.FINANCIAL_CARD:
      return validateFinancialCardAbuse

    case sections.FINANCIAL_CREDIT:
      return validateFinancialCredit

    case sections.FINANCIAL_DELINQUENT:
      return validateFinancialDelinquent

    case sections.FINANCIAL_NONPAYMENT:
      return validateFinancialNonpayment

    case sections.SUBSTANCE_USE_DRUGS_USAGE:
      return validateDrugUses

    case sections.SUBSTANCE_USE_DRUGS_PURCHASE:
      return validateDrugInvolvements

    case sections.SUBSTANCE_USE_DRUGS_CLEARANCE:
      return validateDrugClearanceUses

    case sections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY:
      return validateDrugSafetyUses

    case sections.SUBSTANCE_USE_DRUGS_MISUSE:
      return validateDrugPrescriptionUses

    case sections.SUBSTANCE_USE_DRUGS_ORDERED:
      return validateDrugOrderedTreatments

    case sections.SUBSTANCE_USE_DRUGS_VOLUNTARY:
      return validateDrugVoluntaryTreatments

    case sections.SUBSTANCE_USE_ALCOHOL_NEGATIVE:
      return validateNegativeImpacts

    case sections.SUBSTANCE_USE_ALCOHOL_ORDERED:
      return validateOrderedCounselings

    case sections.SUBSTANCE_USE_ALCOHOL_VOLUNTARY:
      return validateVoluntaryCounselings

    case sections.SUBSTANCE_USE_ALCOHOL_ADDITIONAL:
      return validateReceivedCounselings

    case sections.LEGAL_POLICE_OFFENSES:
      return validatePoliceOffenses

    case sections.LEGAL_POLICE_ADDITIONAL_OFFENSES:
      return validatePoliceOtherOffenses

    case sections.LEGAL_POLICE_DOMESTIC_VIOLENCE:
      return validateDomesticViolence

    case sections.LEGAL_INVESTIGATIONS_HISTORY:
      return validateLegalInvestigationsHistory

    case sections.LEGAL_INVESTIGATIONS_REVOKED:
      return validateLegalInvestigationsRevoked

    case sections.LEGAL_INVESTIGATIONS_DEBARRED:
      return validateLegalInvestigationsDebarred

    case sections.LEGAL_COURT:
      return validateLegalNonCriminalCourtActions

    case sections.LEGAL_TECHNOLOGY_UNAUTHORIZED:
      return validateLegalTechnologyUnauthorized

    case sections.LEGAL_TECHNOLOGY_MANIPULATING:
      return validateLegalTechnologyManipulating

    case sections.LEGAL_TECHNOLOGY_UNLAWFUL:
      return validateLegalTechnologyUnlawful

    case sections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION:
      return validateLegalTerrorist

    case sections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM:
      return validateLegalAssociationEngaged

    case sections.LEGAL_ASSOCIATIONS_ADVOCATING:
      return validateLegalAssociationAdvocate

    case sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW:
      return validateLegalOverthrow

    case sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE:
      return validateLegalViolence

    case sections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW:
      return validateLegalAssociationActivities

    case sections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION:
      return validateLegalAssociationTerrorism

    case sections.PSYCHOLOGICAL_COMPETENCE:
      return validateCompetence

    case sections.PSYCHOLOGICAL_CONSULTATIONS:
      return validateConsultations

    case sections.PSYCHOLOGICAL_HOSPITALIZATIONS:
      return validateHospitalizations

    case sections.PSYCHOLOGICAL_DIAGNOSES:
      return validateDiagnoses

    case sections.PSYCHOLOGICAL_CONDITIONS:
      return validateExistingConditions

    case sections.REVIEW_AND_SUBMIT_COMMENTS:
      return validatePackageComments

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
