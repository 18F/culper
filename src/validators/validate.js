import * as logic from '.'

export const validate = (payload) => {
  if (payload && payload.type) {
    return validators[payload.type](payload.props)
  }
  return false
}

const validators = {
  'benefit': (data) => {
    return false
  },
  'branch': (data) => {
    return logic.validBranch(data)
  },
  'checkbox': (data) => {
    return logic.validGenericTextfield(data)
  },
  'checkboxgroup': (data) => {
    return false
  },
  'clearancelevel': (data) => {
    return false
  },
  'collection': (data) => {
    return false
  },
  'contacts': (data) => {
    return false
  },
  'coowners': (data) => {
    return false
  },
  'country': (data) => {
    return false
  },
  'datecontrol': (data) => {
    return new logic.DateControlValidator(data)
  },
  'daterange': (data) => {
    return new logic.DateRangeValidator(data)
  },
  'email': (data) => {
    return logic.validGenericTextfield(data)
  },
  'employmentactivity': (data) => {
    return false
  },
  'foreignborndocument': (data) => {
    return new logic.ForeignBornDocumentValidator(data)
  },
  'height': (data) => {
    return false
  },
  'location': (data) => {
    return new logic.LocationValidator(data).isValid()
  },
  'name': (data) => {
    return new logic.NameValidator(data).isValid()
  },
  'notapplicable': (data) => {
    return false
  },
  'number': (data) => {
    return false
  },
  'physicaladdress': (data) => {
    return false
  },
  'radio': (data) => {
    return logic.validGenericTextfield(data)
  },
  'reasonleft': (data) => {
    return false
  },
  'reference': (data) => {
    return new logic.Reference(data).isValid()
  },
  'sentence': (data) => {
    return new logic.SentenceValidator(data).isValid()
  },
  'ssn': (data) => {
    return logic.validSSN(data)
  },
  'supervisor': (data) => {
    return false
  },
  'telephone': (data) => {
    return logic.validPhoneNumber(data)
  },
  'text': (data) => {
    return logic.validGenericTextfield(data)
  },
  'textarea': (data) => {
    return logic.validGenericTextfield(data)
  },
  'identification.name': (data) => {
    return new logic.NameValidator(data).isValid()
  },
  'identification.contacts': (data) => {
    return new logic.ContactInformationValidator(data).isValid()
  },
  'identification.othernames': (data) => {
    return new logic.OtherNamesValidator(data).isValid()
  },
  'identification.birthdate': (data) => {
    return new logic.DateControlValidator(data).isValid()
  },
  'identification.birthplace': (data) => {
    return new logic.BirthPlaceValidator(data).isValid()
  },
  'identification.ssn': (data) => {
    return logic.validSSN(data) && data.verified
  },
  'identification.physical': (data) => {
    return new logic.PhysicalValidator(data).isValid()
  },
  'financial.bankruptcy': (data) => {
    return new logic.BankruptcyValidator(data).isValid()
  },
  'financial.gambling': (data) => {
    return new logic.GamblingValidator(data).isValid()
  },
  'financial.taxes': (data) => {
    return new logic.TaxesValidator(data).isValid()
  },
  'financial.card': (data) => {
    return new logic.CardAbuseValidator(data).isValid()
  },
  'financial.credit': (data) => {
    return new logic.CreditValidator(data).isValid()
  },
  'financial.delinquent': (data) => {
    return new logic.DelinquentValidator(data).isValid()
  },
  'financial.nonpayment': (data) => {
    return new logic.NonpaymentValidator(data).isValid()
  },
  'history.residence': (data) => {
    return false
  },
  'history.employment': (data) => {
    return false
  },
  'history.education': (data) => {
    return false
  },
  'history.federal': (data) => {
    return false
  },
  'relationships.marital': (data) => {
    return false
  },
  'relationships.cohabitants': (data) => {
    return false
  },
  'relationships.people': (data) => {
    return false
  },
  'relationships.relatives': (data) => {
    return false
  },
  'citizenship.status': (data) => {
    return false
  },
  'citizenship.multiple': (data) => {
    return false
  },
  'citizenship.passports': (data) => {
    return false
  },
  'military.selective': (data) => {
    return new logic.SelectiveServiceValidator(data).isValid()
  },
  'military.history': (data) => {
    return new logic.MilitaryHistoryValidator(data).isValid()
  },
  'military.disciplinary': (data) => {
    return new logic.MilitaryDisciplinaryValidator(data).isValid()
  },
  'military.foreign': (data) => {
    return new logic.MilitaryForeignValidator(data).isValid()
  },
  'foreign.passport': (data) => {
    return new logic.PassportValidator(data).isValid()
  },
  'foreign.contacts': (data) => {
    return new logic.ForeignContactsValidator(data).isValid()
  },
  'foreign.travel': (data) => {
    return new logic.ForeignTravelValidator(data).isValid()
  },
  'foreign.activities.benefits': (data) => {
    return new logic.ForeignBenefitActivityValidator(data).isValid()
  },
  'foreign.activities.direct': (data) => {
    return new logic.ForeignDirectActivityValidator(data).isValid()
  },
  'foreign.activities.indirect': (data) => {
    return new logic.ForeignIndirectActivityValidator(data).isValid()
  },
  'foreign.activities.realestate': (data) => {
    return new logic.ForeignRealEstateActivityValidator(data).isValid()
  },
  'foreign.activities.support': (data) => {
    return new logic.ForeignActivitiesSupportValidator(data).isValid()
  },
  'foreign.business.advice': (data) => {
    return new logic.ForeignBusinessAdviceValidator(data).isValid()
  },
  'foreign.business.conferences': (data) => {
    return new logic.ForeignBusinessConferencesValidator(data).isValid()
  },
  'foreign.business.contact': (data) => {
    return new logic.ForeignBusinessContactValidator(data).isValid()
  },
  'foreign.business.employment': (data) => {
    return new logic.ForeignBusinessEmploymentValidator(data).isValid()
  },
  'foreign.business.family': (data) => {
    return new logic.ForeignBusinessFamilyValidator(data).isValid()
  },
  'foreign.business.political': (data) => {
    return new logic.ForeignBusinessPoliticalValidator(data).isValid()
  },
  'foreign.business.sponsorship': (data) => {
    return new logic.ForeignBusinessSponsorshipValidator(data).isValid()
  },
  'foreign.business.ventures': (data) => {
    return new logic.ForeignBusinessVenturesValidator(data).isValid()
  },
  'foreign.business.voting': (data) => {
    return new logic.ForeignBusinessVotingValidator(data).isValid()
  },
  'substance.drug.clearance': (data) => {
    return false
  },
  'substance.drug.misuse': (data) => {
    return false
  },
  'substance.drug.ordered': (data) => {
    return false
  },
  'substance.drug.publicsafety': (data) => {
    return false
  },
  'substance.drug.purchase': (data) => {
    return false
  },
  'substance.drug.usage': (data) => {
    return false
  },
  'substance.drug.voluntary': (data) => {
    return false
  },
  'substance.alcohol.negative': (data) => {
    return false
  },
  'substance.alcohol.ordered': (data) => {
    return false
  },
  'substance.alcohol.voluntary': (data) => {
    return false
  },
  'substance.alcohol.additional': (data) => {
    return false
  },
  'legal.associations.activities-to-overthrow': (data) => {
    return new logic.LegalAssociationsActivitiesValidator(data).isValid()
  },
  'legal.associations.advocating': (data) => {
    return new logic.LegalAssociationsAdvocatingValidator(data).isValid()
  },
  'legal.associations.engaged-in-terrorism': (data) => {
    return new logic.LegalAssociationsEngagedValidator(data).isValid()
  },
  'legal.associations.membership-overthrow': (data) => {
    return new logic.LegalAssociationsOverthrowValidator(data).isValid()
  },
  'legal.associations.membership-violence-or-force': (data) => {
    return new logic.LegalAssociationsViolenceValidator(data).isValid()
  },
  'legal.associations.terrorism-association': (data) => {
    return new logic.LegalAssociationsTerrorismValidator(data).isValid()
  },
  'legal.associations.terrorist-organization': (data) => {
    return new logic.LegalAssociationsTerroristValidator(data).isValid()
  },
  'legal.court': (data) => {
    return new logic.LegalNonCriminalCourtActionsValidator(data).isValid()
  },
  'legal.investigations.debarred': (data) => {
    return new logic.LegalInvestigationsDebarredValidator(data).isValid()
  },
  'legal.investigations.history': (data) => {
    return new logic.LegalInvestigationsHistoryValidator(data).isValid()
  },
  'legal.investigations.revoked': (data) => {
    return new logic.LegalInvestigationsRevokedValidator(data).isValid()
  },
  'legal.police.additionaloffenses': (data) => {
    return new logic.PoliceOtherOffensesValidator(data).isValid()
  },
  'legal.police.domesticviolence': (data) => {
    return new logic.DomesticViolenceValidator(data).isValid()
  },
  'legal.police.offenses': (data) => {
    return new logic.PoliceOffensesValidator(data).isValid()
  },
  'legal.technology.manipulating': (data) => {
    return new logic.LegalTechnologyManipulatingValidator(data).isValid()
  },
  'legal.technology.unauthorized': (data) => {
    return new logic.LegalTechnologyUnauthorizedValidator(data).isValid()
  },
  'legal.technology.unlawful': (data) => {
    return new logic.LegalTechnologyUnlawfulValidator(data).isValid()
  },
  'psychological.competence': (data) => {
    return new logic.CompetenceValidator(data).isValid()
  },
  'psychological.consultations': (data) => {
    return new logic.ConsultationValidator(data).isValid()
  },
  'psychological.diagnoses': (data) => {
    return new logic.DiagnosesValidator(data).isValid()
  },
  'psychological.existing': (data) => {
    return new logic.ExistingConditionsValidator(data).isValid()
  },
  'psychological.hospitalizations': (data) => {
    return new logic.HospitalizationsValidator(data).isValid()
  },
  'psychological.treatment': (data) => {
    return false
  }
}
