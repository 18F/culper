import * as form from './form'
import * as section from './section'

const transform = {
  benefit: data => form.benefit(data),
  branch: data => form.branch(data),
  checkbox: data => form.checkbox(data),
  checkboxgroup: data => form.checkboxgroup(data),
  clearancelevel: data => form.clearancelevel(data),
  collection: data => form.collection(data),
  contacts: data => form.contacts(data),
  coowners: data => form.coowners(data),
  country: data => form.country(data),
  datecontrol: data => form.datecontrol(data),
  daterange: data => form.daterange(data),
  email: data => form.email(data),
  employmentactivity: data => form.employmentactivity(data),
  foreignborndocument: data => form.foreignborndocument(data),
  height: data => form.height(data),
  location: data => form.location(data),
  name: data => form.name(data),
  notapplicable: data => form.notapplicable(data),
  number: data => form.number(data),
  physicaladdress: data => form.physicaladdress(data),
  radio: data => form.radio(data),
  reasonleft: data => form.reasonleft(data),
  sentence: data => form.sentence(data),
  signature: data => form.signature(data),
  ssn: data => form.ssn(data),
  supervisor: data => form.supervisor(data),
  telephone: data => form.telephone(data),
  text: data => form.text(data),
  textarea: data => form.textarea(data),
  'identification.birthdate': data => section.identificationBirthdate(data),
  'identification.birthplace': data => section.identificationBirthplace(data),
  'identification.contacts': data => section.identificationContacts(data),
  'identification.name': data => section.identificationName(data),
  'identification.othernames': data => section.identificationOthernames(data),
  'identification.physical': data => section.identificationPhysical(data),
  'identification.ssn': data => section.identificationSSN(data),
  'financial.bankruptcy': data => section.financialBankruptcy(data),
  'financial.gambling': data => section.financialGambling(data),
  'financial.taxes': data => section.financialTaxes(data),
  'financial.card': data => section.financialCard(data),
  'financial.credit': data => section.financialCredit(data),
  'financial.delinquent': data => section.financialDelinquent(data),
  'financial.nonpayment': data => section.financialNonpayment(data),
  'history.education': data => section.historyEducation(data),
  'history.employment': data => section.historyEmployment(data),
  'history.federal': data => section.historyFederal(data),
  'history.residence': data => section.historyResidence(data),
  'relationships.status.cohabitant': data => section.relationshipsCohabitants(data),
  'relationships.status.marital': data => section.relationshipsMarital(data),
  'relationships.people': data => section.relationshipsPeople(data),
  'relationships.relatives': data => section.relationshipsRelatives(data),
  'citizenship.multiple': data => section.citizenshipMultiple(data),
  'citizenship.passports': data => section.citizenshipPassports(data),
  'citizenship.status': data => section.citizenshipStatus(data),
  'military.selective': data => section.militarySelective(data),
  'military.history': data => section.militaryHistory(data),
  'military.disciplinary': data => section.militaryDisciplinary(data),
  'military.foreign': data => section.militaryForeign(data),
  'foreign.activities.benefits': data => section.foreignActivitiesBenefits(data),
  'foreign.activities.direct': data => section.foreignActivitiesDirect(data),
  'foreign.activities.indirect': data => section.foreignActivitiesIndirect(data),
  'foreign.activities.realestate': data => section.foreignActivitiesRealestate(data),
  'foreign.activities.support': data => section.foreignActivitiesSupport(data),
  'foreign.business.advice': data => section.foreignBusinessAdvice(data),
  'foreign.business.conferences': data => section.foreignBusinessConferences(data),
  'foreign.business.contact': data => section.foreignBusinessContact(data),
  'foreign.business.employment': data => section.foreignBusinessEmployment(data),
  'foreign.business.family': data => section.foreignBusinessFamily(data),
  'foreign.business.political': data => section.foreignBusinessPolitical(data),
  'foreign.business.sponsorship': data => section.foreignBusinessSponsorship(data),
  'foreign.business.ventures': data => section.foreignBusinessVentures(data),
  'foreign.business.voting': data => section.foreignBusinessVoting(data),
  'foreign.contacts': data => section.foreignContacts(data),
  'foreign.passport': data => section.foreignPassport(data),
  'foreign.travel': data => section.foreignTravel(data),
  'substance.alcohol.additional': data => section.substanceAlcoholAdditional(data),
  'substance.alcohol.negative': data => section.substanceAlcoholNegative(data),
  'substance.alcohol.ordered': data => section.substanceAlcoholOrdered(data),
  'substance.alcohol.voluntary': data => section.substanceAlcoholVoluntary(data),
  'substance.drugs.clearance': data => section.substanceDrugClearance(data),
  'substance.drugs.misuse': data => section.substanceDrugMisuse(data),
  'substance.drugs.ordered': data => section.substanceDrugOrdered(data),
  'substance.drugs.publicsafety': data => section.substanceDrugPublicSafety(data),
  'substance.drugs.purchase': data => section.substanceDrugPurchase(data),
  'substance.drugs.usage': data => section.substanceDrugUsage(data),
  'substance.drugs.voluntary': data => section.substanceDrugVoluntary(data),
  'legal.associations.activities-to-overthrow': data => section.legalAssociationsActivitiesToOverthrow(data),
  'legal.associations.advocating': data => section.legalAssociationsAdvocating(data),
  'legal.associations.engaged-in-terrorism': data => section.legalAssociationsEngagedInTerrorism(data),
  'legal.associations.membership-overthrow': data => section.legalAssociationsMembershipOverthrow(data),
  'legal.associations.membership-violence-or-force': data => section.legalAssociationsMembershipViolenceOrForce(data),
  'legal.associations.terrorism-association': data => section.legalAssociationsTerrorismAssociation(data),
  'legal.associations.terrorist-organization': data => section.legalAssociationsTerroristOrganization(data),
  'legal.court': data => section.legalCourt(data),
  'legal.investigations.debarred': data => section.legalInvestigationsDebarred(data),
  'legal.investigations.history': data => section.legalInvestigationsHistory(data),
  'legal.investigations.revoked': data => section.legalInvestigationsRevoked(data),
  'legal.police.additionaloffenses': data => section.legalPoliceAdditionalOffenses(data),
  'legal.police.domesticviolence': data => section.legalPoliceDomesticViolence(data),
  'legal.police.offenses': data => section.legalPoliceOffenses(data),
  'legal.technology.manipulating': data => section.legalTechnologyManipulating(data),
  'legal.technology.unauthorized': data => section.legalTechnologyUnauthorized(data),
  'legal.technology.unlawful': data => section.legalTechnologyUnlawful(data),
  'psychological.competence': data => section.psychologicalCompetence(data),
  'psychological.conditions': data => section.psychologicalExisting(data),
  'psychological.consultations': data => section.psychologicalConsultations(data),
  'psychological.diagnoses': data => section.psychologicalDiagnoses(data),
  'psychological.hospitalizations': data => section.psychologicalHospitalizations(data),
  'psychological.treatment': data => form.treatment(data),
  'package.submit': data => section.submission(data),
}

export const schema = (type, props, raw = true) => {
  const transformFunc = transform[type]
  return {
    type,
    props: raw ? props : transformFunc && transformFunc(props),
  }
}

export const unschema = (data) => {
  if (data === undefined || data === null) {
    return null
  }

  if (data instanceof Array) {
    const outputArr = []

    for (let x = 0; x < data.length; x += 1) {
      outputArr[x] = unschema(data[x])
    }

    return outputArr
  }

  if (data instanceof Date) {
    return data
  }

  // Check for other types of objects
  if (data instanceof Object) {
    // Payload scructure
    if (data.type && data.props) {
      return unschema(data.props)
    }

    const outputObj = {}

    for (const property in data) {
      // When the property is not specific to this instance
      // skip it and go to the next.
      if (!data.hasOwnProperty(property)) {
        continue
      }

      outputObj[property] = unschema(data[property])
    }

    return outputObj
  }

  // If not an object nor an array work with the raw value
  return data
}
