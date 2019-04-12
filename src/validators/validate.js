import * as logic from '.'

const validate = (payload) => {
  if (payload && payload.type) {
    return validators[payload.type](payload.props)
  }
  return false
}
export default validate

const validators = {
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
  'identification.birthdate': data => new logic.IdentificationBirthDateValidator(data).isValid(),
  'identification.birthplace': data => new logic.IdentificationBirthPlaceValidator(data).isValid(),
  'identification.contacts': data => new logic.IdentificationContactInformationValidator(data).isValid(),
  'identification.name': data => new logic.IdentificationNameValidator(data).isValid(),
  'identification.othernames': data => new logic.IdentificationOtherNamesValidator(data).isValid(),
  'identification.physical': data => new logic.IdentificationPhysicalValidator(data).isValid(),
  'identification.ssn': data => new logic.IdentificationSSNValidator(data).isValid(),
  'financial.bankruptcy': data => new logic.BankruptcyValidator(data).isValid(),
  'financial.gambling': data => new logic.GamblingValidator(data).isValid(),
  'financial.taxes': data => new logic.TaxesValidator(data).isValid(),
  'financial.card': data => new logic.CardAbuseValidator(data).isValid(),
  'financial.credit': data => new logic.CreditValidator(data).isValid(),
  'financial.delinquent': data => new logic.DelinquentValidator(data).isValid(),
  'financial.nonpayment': data => new logic.NonpaymentValidator(data).isValid(),
  'history.education': data => new logic.HistoryEducationValidator(data).isValid(),
  'history.employment': data => new logic.HistoryEmploymentValidator(data).isValid(),
  'history.federal': data => new logic.FederalServiceValidator(data).isValid(),
  'history.residence': data => new logic.HistoryResidenceValidator(data).isValid(),
  'relationships.status.cohabitant': data => new logic.CohabitantsValidator(data).isValid(),
  'relationships.status.marital': data => new logic.MaritalValidator(data).isValid(),
  'relationships.people': data => new logic.PeopleValidator(data).isValid(),
  'relationships.relatives': data => new logic.RelativesValidator(data).isValid(),
  'citizenship.multiple': data => new logic.CitizenshipMultipleValidator(data).isValid(),
  'citizenship.passports': data => new logic.CitizenshipPassportsValidator(data).isValid(),
  'citizenship.status': data => new logic.CitizenshipValidator(data).isValid(),
  'military.selective': data => new logic.SelectiveServiceValidator(data).isValid(),
  'military.history': data => new logic.MilitaryHistoryValidator(data).isValid(),
  'military.disciplinary': data => new logic.MilitaryDisciplinaryValidator(data).isValid(),
  'military.foreign': data => new logic.MilitaryForeignValidator(data).isValid(),
  'foreign.activities.benefits': data => new logic.ForeignBenefitActivityValidator(data).isValid(),
  'foreign.activities.direct': data => new logic.ForeignDirectActivityValidator(data).isValid(),
  'foreign.activities.indirect': data => new logic.ForeignIndirectActivityValidator(data).isValid(),
  'foreign.activities.realestate': data => new logic.ForeignRealEstateActivityValidator(data).isValid(),
  'foreign.activities.support': data => new logic.ForeignActivitiesSupportValidator(data).isValid(),
  'foreign.business.advice': data => new logic.ForeignBusinessAdviceValidator(data).isValid(),
  'foreign.business.conferences': data => new logic.ForeignBusinessConferencesValidator(data).isValid(),
  'foreign.business.contact': data => new logic.ForeignBusinessContactValidator(data).isValid(),
  'foreign.business.employment': data => new logic.ForeignBusinessEmploymentValidator(data).isValid(),
  'foreign.business.family': data => new logic.ForeignBusinessFamilyValidator(data).isValid(),
  'foreign.business.political': data => new logic.ForeignBusinessPoliticalValidator(data).isValid(),
  'foreign.business.sponsorship': data => new logic.ForeignBusinessSponsorshipValidator(data).isValid(),
  'foreign.business.ventures': data => new logic.ForeignBusinessVenturesValidator(data).isValid(),
  'foreign.business.voting': data => new logic.ForeignBusinessVotingValidator(data).isValid(),
  'foreign.contacts': data => new logic.ForeignContactsValidator(data).isValid(),
  'foreign.passport': data => new logic.PassportValidator(data).isValid(),
  'foreign.travel': data => new logic.ForeignTravelValidator(data).isValid(),
  'substance.alcohol.additional': data => new logic.AlcoholReceivedCounselingsValidator(data).isValid(),
  'substance.alcohol.negative': data => new logic.AlcoholNegativeImpactsValidator(data).isValid(),
  'substance.alcohol.ordered': data => new logic.AlcoholOrderedCounselingsValidator(data).isValid(),
  'substance.alcohol.voluntary': data => new logic.AlcoholVoluntaryCounselingsValidator(data).isValid(),
  'substance.drugs.clearance': data => new logic.DrugClearanceUsesValidator(data).isValid(),
  'substance.drugs.misuse': data => new logic.DrugPrescriptionUsesValidator(data).isValid(),
  'substance.drugs.ordered': data => new logic.DrugOrderedTreatmentsValidator(data).isValid(),
  'substance.drugs.publicsafety': data => new logic.DrugPublicSafetyUsesValidator(data).isValid(),
  'substance.drugs.purchase': data => new logic.DrugInvolvementsValidator(data).isValid(),
  'substance.drugs.usage': data => new logic.DrugUsesValidator(data).isValid(),
  'substance.drugs.voluntary': data => new logic.DrugVoluntaryTreatmentsValidator(data).isValid(),
  'legal.associations.activities-to-overthrow': data => new logic.LegalAssociationsActivitiesValidator(data).isValid(),
  'legal.associations.advocating': data => new logic.LegalAssociationsAdvocatingValidator(data).isValid(),
  'legal.associations.engaged-in-terrorism': data => new logic.LegalAssociationsEngagedValidator(data).isValid(),
  'legal.associations.membership-overthrow': data => new logic.LegalAssociationsOverthrowValidator(data).isValid(),
  'legal.associations.membership-violence-or-force': data => new logic.LegalAssociationsViolenceValidator(data).isValid(),
  'legal.associations.terrorism-association': data => new logic.LegalAssociationsTerrorismValidator(data).isValid(),
  'legal.associations.terrorist-organization': data => new logic.LegalAssociationsTerroristValidator(data).isValid(),
  'legal.court': data => new logic.LegalNonCriminalCourtActionsValidator(data).isValid(),
  'legal.investigations.debarred': data => new logic.LegalInvestigationsDebarredValidator(data).isValid(),
  'legal.investigations.history': data => new logic.LegalInvestigationsHistoryValidator(data).isValid(),
  'legal.investigations.revoked': data => new logic.LegalInvestigationsRevokedValidator(data).isValid(),
  'legal.police.additionaloffenses': data => new logic.PoliceOtherOffensesValidator(data).isValid(),
  'legal.police.domesticviolence': data => new logic.DomesticViolenceValidator(data).isValid(),
  'legal.police.offenses': data => new logic.PoliceOffensesValidator(data).isValid(),
  'legal.technology.manipulating': data => new logic.LegalTechnologyManipulatingValidator(data).isValid(),
  'legal.technology.unauthorized': data => new logic.LegalTechnologyUnauthorizedValidator(data).isValid(),
  'legal.technology.unlawful': data => new logic.LegalTechnologyUnlawfulValidator(data).isValid(),
  'psychological.competence': data => new logic.CompetenceValidator(data).isValid(),
  'psychological.conditions': data => new logic.ExistingConditionsValidator(data).isValid(),
  'psychological.consultations': data => new logic.ConsultationValidator(data).isValid(),
  'psychological.diagnoses': data => new logic.DiagnosesValidator(data).isValid(),
  'psychological.hospitalizations': data => new logic.HospitalizationsValidator(data).isValid(),
  'psychological.treatment': () => false,
}

// Walk through the validation tree of a piece of information.
// This is useful when all values within a particular chunk of
// data does not contain validations based on branching.
export const walkValidationTree = (data) => {
  // No data, no love.
  if (!data) {
    return false
  }

  // If the data matches the signature of a payload we know
  // how to proceed with normal validation logic.
  if (data.type && data.props) {
    return validators(data)
  }

  // The data may be an object with named properties
  // potentially containing payload. We want to "mine"
  // for these and extract their results.
  for (const property in data) {
    // When the property is not specific to this instance
    // skip it and go to the next.
    if (!data.hasOwnProperty(property)) {
      continue
    }

    const result = walkValidationTree(data[property])
    if (!result) {
      return false
    }
  }

  return true
}
