import * as form from './form'
import * as section from './section'

export const schematize = (type, props, raw = true) => {
  return {
    type: type,
    props: raw ? props : transform[type](props)
  }
}

const transform = {
  'benefit': (data) => {
    return form.benefit(data)
  },
  'branch': (data) => {
    return form.branch(data)
  },
  'checkbox': (data) => {
    return form.checkbox(data)
  },
  'checkboxgroup': (data) => {
    return form.checkboxgroup(data)
  },
  'clearancelevel': (data) => {
    return form.clearnancelevel(data)
  },
  'collection': (data) => {
    return form.collection(data)
  },
  'contacts': (data) => {
    return form.contacts(data)
  },
  'coowners': (data) => {
    return form.coowners(data)
  },
  'country': (data) => {
    return form.country(data)
  },
  'datecontrol': (data) => {
    return form.datecontrol(data)
  },
  'daterange': (data) => {
    return form.daterange(data)
  },
  'email': (data) => {
    return form.email(data)
  },
  'employmentactivity': (data) => {
    return form.employmentactivity(data)
  },
  'foreignborndocument': (data) => {
    return form.foreignborndocument(data)
  },
  'height': (data) => {
    return form.height(data)
  },
  'location': (data) => {
    return form.location(data)
  },
  'name': (data) => {
    return form.name(data)
  },
  'notapplicable': (data) => {
    return form.notapplicable(data)
  },
  'number': (data) => {
    return form.number(data)
  },
  'physicaladdress': (data) => {
    return form.physicaladdress(data)
  },
  'radio': (data) => {
    return form.radio(data)
  },
  'reasonleft': (data) => {
    return form.reasonleft(data)
  },
  'reference': (data) => {
    return form.reference(data)
  },
  'sentence': (data) => {
    return form.sentence(data)
  },
  'ssn': (data) => {
    return form.ssn(data)
  },
  'supervisor': (data) => {
    return form.supervisor(data)
  },
  'telephone': (data) => {
    return form.telephone(data)
  },
  'text': (data) => {
    return form.text(data)
  },
  'textarea': (data) => {
    return form.textarea(data)
  },
  'identification.name': (data) => {
    return section.identificationName(data)
  },
  'identification.contacts': (data) => {
    return section.identificationContacts(data)
  },
  'identification.othernames': (data) => {
    return section.identificationOthernames(data)
  },
  'identification.birthdate': (data) => {
    return section.identificationBirthdate(data)
  },
  'identification.birthplace': (data) => {
    return section.identificationBirthplace(data)
  },
  'identification.ssn': (data) => {
    return section.identificationSSN(data)
  },
  'identification.physical': (data) => {
    return section.identificationPhysical(data)
  },
  'financial.bankruptcy': (data) => {
    return section.financialBankruptcy(data)
  },
  'financial.gambling': (data) => {
    return section.financialGambling(data)
  },
  'financial.taxes': (data) => {
    return section.financialTaxes(data)
  },
  'financial.card': (data) => {
    return section.financialCard(data)
  },
  'financial.credit': (data) => {
    return section.financialCredit(data)
  },
  'financial.delinquent': (data) => {
    return section.financialDelinquent(data)
  },
  'financial.nonpayment': (data) => {
    return section.financialNonpayment(data)
  },
  'history.education': (data) => {
    return section.historyEducation(data)
  },
  'history.employment': (data) => {
    return section.historyEmployment(data)
  },
  'history.federal': (data) => {
    return section.historyFederal(data)
  },
  'history.residence': (data) => {
    return section.historyResidence(data)
  },
  'relationships.cohabitants': (data) => {
    return section.relationshipsCohabitants(data)
  },
  'relationships.marital': (data) => {
    return section.relationshipsMarital(data)
  },
  'relationships.people': (data) => {
    return section.relationshipsPeople(data)
  },
  'relationships.relatives': (data) => {
    return section.relationshipsRelatives(data)
  },
  'citizenship.multiple': (data) => {
    return section.citizenshipMultiple(data)
  },
  'citizenship.passports': (data) => {
    return section.citizenshipPassports(data)
  },
  'citizenship.status': (data) => {
    return section.citizenshipStatus(data)
  },
  'military.selective': (data) => {
    return section.militarySelective(data)
  },
  'military.history': (data) => {
    return section.militaryHistory(data)
  },
  'military.disciplinary': (data) => {
    return section.militaryDisciplinary(data)
  },
  'military.foreign': (data) => {
    return section.militaryForeign(data)
  },
  'foreign.passport': (data) => {
    return section.foreignPassport(data)
  },
  'foreign.contacts': (data) => {
    return section.foreignContacts(data)
  },
  'foreign.travel': (data) => {
    return section.foreignTravel(data)
  },
  'foreign.activities.benefits': (data) => {
    return section.foreignActivitiesBenefits(data)
  },
  'foreign.activities.direct': (data) => {
    return section.foreignActivitiesDirect(data)
  },
  'foreign.activities.indirect': (data) => {
    return section.foreignActivitiesIndirect(data)
  },
  'foreign.activities.realestate': (data) => {
    return section.foreignActivitiesRealestate(data)
  },
  'foreign.activities.support': (data) => {
    return section.foreignActivitiesSupport(data)
  },
  'foreign.business.advice': (data) => {
    return section.foreignBusinessAdvice(data)
  },
  'foreign.business.conferences': (data) => {
    return section.foreignBusinessConferences(data)
  },
  'foreign.business.contact': (data) => {
    return section.foreignBusinessContact(data)
  },
  'foreign.business.employment': (data) => {
    return section.foreignBusinessEmployment(data)
  },
  'foreign.business.family': (data) => {
    return section.foreignBusinessFamily(data)
  },
  'foreign.business.political': (data) => {
    return section.foreignBusinessPolitical(data)
  },
  'foreign.business.sponsorship': (data) => {
    return section.foreignBusinessSponsorship(data)
  },
  'foreign.business.ventures': (data) => {
    return section.foreignBusinessVentures(data)
  },
  'foreign.business.voting': (data) => {
    return section.foreignBusinessVoting(data)
  },
  'substance.alcohol.additional': (data) => {
    return section.substanceAlcoholAdditional(data)
  },
  'substance.alcohol.negative': (data) => {
    return section.substanceAlcoholNegative(data)
  },
  'substance.alcohol.ordered': (data) => {
    return section.substanceAlcoholOrdered(data)
  },
  'substance.alcohol.voluntary': (data) => {
    return section.substanceAlcoholVoluntary(data)
  },
  'substance.drug.clearance': (data) => {
    return section.substanceDrugClearance(data)
  },
  'substance.drug.misuse': (data) => {
    return section.substanceDrugMisuse(data)
  },
  'substance.drug.ordered': (data) => {
    return section.substanceDrugOrdered(data)
  },
  'substance.drug.publicsafety': (data) => {
    return section.substanceDrugPublicsafety(data)
  },
  'substance.drug.purchase': (data) => {
    return section.substanceDrugPurchase(data)
  },
  'substance.drug.usage': (data) => {
    return section.substanceDrugUsage(data)
  },
  'substance.drug.voluntary': (data) => {
    return section.substanceDrugVoluntary(data)
  },
  'legal.associations.activities-to-overthrow': (data) => {
    return section.legalAssociationsActivitiesToOverthrow(data)
  },
  'legal.associations.advocating': (data) => {
    return section.legalAssociationsAdvocating(data)
  },
  'legal.associations.engaged-in-terrorism': (data) => {
    return section.legalAssociationsEngagedInTerrorism(data)
  },
  'legal.associations.membership-overthrow': (data) => {
    return section.legalAssociationsMembershipOverthrow(data)
  },
  'legal.associations.membership-violence-or-force': (data) => {
    return section.legalAssociationsMembershipViolenceOrForce(data)
  },
  'legal.associations.terrorism-association': (data) => {
    return section.legalAssociationsTerrorismAssociation(data)
  },
  'legal.associations.terrorist-organization': (data) => {
    return section.legalAssociationsTerroristOrganization(data)
  },
  'legal.court': (data) => {
    return section.legalCourt(data)
  },
  'legal.investigations.debarred': (data) => {
    return section.legalInvestigationsDebarred(data)
  },
  'legal.investigations.history': (data) => {
    return section.legalInvestigationsHistory(data)
  },
  'legal.investigations.revoked': (data) => {
    return section.legalInvestigationsRevoked(data)
  },
  'legal.police.additionaloffenses': (data) => {
    return section.legalPoliceAdditionalOffenses(data)
  },
  'legal.police.domesticviolence': (data) => {
    return section.legalPoliceDomesticViolence(data)
  },
  'legal.police.offenses': (data) => {
    return section.legalPoliceOffenses(data)
  },
  'legal.technology.manipulating': (data) => {
    return section.legalTechnologyManipulating(data)
  },
  'legal.technology.unauthorized': (data) => {
    return section.legalTechnologyUnauthorized(data)
  },
  'legal.technology.unlawful': (data) => {
    return section.legalTechnologyUnlawful(data)
  },
  'psychological.competence': (data) => {
    return section.psychologicalCompetence(data)
  },
  'psychological.consultations': (data) => {
    return section.psychologicalConsultations(data)
  },
  'psychological.diagnoses': (data) => {
    return section.psychologicalDiagnoses(data)
  },
  'psychological.existing': (data) => {
    return section.psychologicalExisting(data)
  },
  'psychological.hospitalizations': (data) => {
    return section.psychologicalHospitalizations(data)
  },
  'psychological.treatment': (data) => {
    return section.psychologicalTreatment(data)
  }
}
