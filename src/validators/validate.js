import store from 'services/store'
import { formTypeSelector } from 'selectors/formType'

// IDENTIFICATION
import { validateIdentificationName } from 'validators/identificationname'
import { validateIdentificationBirthDate } from 'validators/identificationbirthdate'
import { validateIdentificationBirthPlace } from 'validators/identificationbirthplace'
import { validateIdentificationSSN } from 'validators/identificationssn'
import { validateOtherNames } from 'validators/identificationothernames'
import { validateIdentificationContactInformation } from 'validators/identificationcontacts'
import { validateIdentificationPhysical } from 'validators/identificationphysical'
// HISTORY
import { validateHistoryResidence } from 'validators/residence'
import { validateHistoryEmployment } from 'validators/employment'
import { validateHistoryEducation } from 'validators/education'
import { validateHistoryFederal } from 'validators/federalservice'
// RELATIONSHIPS
import { validateMarital } from 'validators/marital'
import { validateCohabitants } from 'validators/cohabitant'
import { validatePeople } from 'validators/people'
import { validateRelatives } from 'validators/relatives'
// CITIZENSHIP
import { validateUsPassport } from 'validators/passport'
import { validateCitizenshipStatus } from 'validators/citizenship'
import { validateCitizenshipMultiple } from 'validators/citizenship-multiple'
import { validateCitizenshipPassports } from 'validators/citizenship-passports'
// MILITARY
import { validateSelectiveService } from 'validators/selectiveservice'
import { validateMilitaryHistory } from 'validators/militaryhistory'
import { validateMilitaryDisciplinaryProcedures } from 'validators/militarydisciplinary'
import { validateMilitaryForeign } from 'validators/militaryforeign'
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

import validatePackageComments from 'validators/packagecomments'

import * as logic from '.'

/**
 * The plan is to deprecate this file and replace with helpers/validation.js
 */

const validators = {
  // GENERIC
  benefit: () => false,
  branch: data => logic.validBranch(data),
  checkbox: data => logic.validGenericTextfield(data),
  checkboxgroup: () => false,
  clearancelevel: () => false,
  collection: () => false,
  contacts: () => false,
  coowners: () => false,
  country: () => false,
  datecontrol: data => new logic.DateControlValidator(data),
  daterange: data => new logic.DateRangeValidator(data),
  email: data => logic.validGenericTextfield(data),
  employmentactivity: () => false,
  foreignborndocument: data => new logic.ForeignBornDocumentValidator(data),
  height: () => false,
  location: data => new logic.LocationValidator(data).isValid(),
  name: data => new logic.NameValidator(data).isValid(),
  notapplicable: () => false,
  number: () => false,
  physicaladdress: () => false,
  radio: data => logic.validGenericTextfield(data),
  reasonleft: () => false,
  sentence: data => new logic.SentenceValidator(data).isValid(),
  ssn: data => logic.validSSN(data),
  supervisor: () => false,
  telephone: data => logic.validPhoneNumber(data),
  text: data => logic.validGenericTextfield(data),
  textarea: data => logic.validGenericTextfield(data),

  // SECTIONS
  'identification.birthdate': validateIdentificationBirthDate,
  'identification.birthplace': validateIdentificationBirthPlace,
  'identification.contacts': validateIdentificationContactInformation,
  'identification.name': validateIdentificationName,
  'identification.othernames': validateOtherNames,
  'identification.physical': validateIdentificationPhysical,
  'identification.ssn': validateIdentificationSSN,
  'financial.bankruptcy': validateFinancialBankruptcy,
  'financial.gambling': validateFinancialGambling,
  'financial.taxes': validateFinancialTaxes,
  'financial.card': validateFinancialCardAbuse,
  'financial.credit': validateFinancialCredit,
  'financial.delinquent': validateFinancialDelinquent,
  'financial.nonpayment': validateFinancialNonpayment,
  'history.education': validateHistoryEducation,
  'history.employment': validateHistoryEmployment,
  'history.federal': validateHistoryFederal,
  'history.residence': validateHistoryResidence,
  'relationships.status.cohabitant': validateCohabitants,
  'relationships.status.marital': validateMarital,
  'relationships.people': validatePeople,
  'relationships.relatives': validateRelatives,
  'citizenship.multiple': validateCitizenshipMultiple,
  'citizenship.passports': validateCitizenshipPassports,
  'citizenship.status': validateCitizenshipStatus,
  'military.selective': validateSelectiveService,
  'military.history': validateMilitaryHistory,
  'military.disciplinary': validateMilitaryDisciplinaryProcedures,
  'military.foreign': validateMilitaryForeign,
  'foreign.activities.benefits': validateForeignBenefitActivity,
  'foreign.activities.direct': validateForeignDirectActivity,
  'foreign.activities.indirect': validateForeignIndirectActivity,
  'foreign.activities.realestate': validateForeignRealEstateActivity,
  'foreign.activities.support': validateForeignActivitiesSupport,
  'foreign.business.advice': validateForeignBusinessAdvice,
  'foreign.business.conferences': validateForeignBusinessConferences,
  'foreign.business.contact': validateForeignBusinessContacts,
  'foreign.business.employment': validateForeignBusinessEmployment,
  'foreign.business.family': validateForeignBusinessFamily,
  'foreign.business.political': validateForeignBusinessPolitical,
  'foreign.business.sponsorship': validateForeignBusinessSponsorship,
  'foreign.business.ventures': validateForeignBusinessVentures,
  'foreign.business.voting': validateForeignBusinessVoting,
  'foreign.contacts': validateForeignContacts,
  'foreign.passport': validateUsPassport,
  'foreign.travel': validateForeignTravel,
  'substance.alcohol.additional': validateReceivedCounselings,
  'substance.alcohol.negative': validateNegativeImpacts,
  'substance.alcohol.ordered': validateOrderedCounselings,
  'substance.alcohol.voluntary': validateVoluntaryCounselings,
  'substance.drugs.clearance': validateDrugClearanceUses,
  'substance.drugs.misuse': validateDrugPrescriptionUses,
  'substance.drugs.ordered': validateDrugOrderedTreatments,
  'substance.drugs.publicsafety': validateDrugSafetyUses,
  'substance.drugs.purchase': validateDrugInvolvements,
  'substance.drugs.usage': validateDrugUses,
  'substance.drugs.voluntary': validateDrugVoluntaryTreatments,
  'legal.associations.activities-to-overthrow': validateLegalAssociationActivities,
  'legal.associations.advocating': validateLegalAssociationAdvocate,
  'legal.associations.engaged-in-terrorism': validateLegalAssociationEngaged,
  'legal.associations.membership-overthrow': validateLegalOverthrow,
  'legal.associations.membership-violence-or-force': validateLegalViolence,
  'legal.associations.terrorism-association': validateLegalAssociationTerrorism,
  'legal.associations.terrorist-organization': validateLegalTerrorist,
  'legal.court': validateLegalNonCriminalCourtActions,
  'legal.investigations.debarred': validateLegalInvestigationsDebarred,
  'legal.investigations.history': validateLegalInvestigationsHistory,
  'legal.investigations.revoked': validateLegalInvestigationsRevoked,
  'legal.police.additionaloffenses': validatePoliceOtherOffenses,
  'legal.police.domesticviolence': validateDomesticViolence,
  'legal.police.offenses': validatePoliceOffenses,
  'legal.technology.manipulating': validateLegalTechnologyManipulating,
  'legal.technology.unauthorized': validateLegalTechnologyUnauthorized,
  'legal.technology.unlawful': validateLegalTechnologyUnlawful,
  'package.comments': validatePackageComments,
  'psychological.competence': validateCompetence,
  'psychological.conditions': validateExistingConditions,
  'psychological.consultations': validateConsultations,
  'psychological.diagnoses': validateDiagnoses,
  'psychological.hospitalizations': validateHospitalizations,
  'psychological.treatment': () => false,
}

const validate = (payload) => {
  // Temporary because we need formType to pass to validation fns
  const state = store.getState()
  const formType = formTypeSelector(state)

  if (payload && payload.type) {
    return validators[payload.type](payload.props, formType)
  }

  return false
}

export default validate
