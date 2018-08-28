import * as form from './form'
import * as section from './section'

export const schema = (type, props, raw = true) => {
  const transformFunc = transform[type]
  return {
    type: type,
    props: raw ? props : transformFunc && transformFunc(props)
  }
}

export const unschema = data => {
  // The absence of something is nothing
  if (data === undefined || data === null) {
    return null
  }

  // An array is a type of object so we check for this first
  if (data instanceof Array) {
    let outputArr = []

    for (let x = 0; x < data.length; x++) {
      outputArr[x] = unschema(data[x])
    }

    return outputArr
  }

  // A date is a type of object so we check for this first
  if (data instanceof Date) {
    return data
  }

  // Check for other types of objects
  if (data instanceof Object) {
    // Payload scructure
    if (hasProperty(data, 'type') && hasProperty(data, 'props')) {
      return unschema(data.props)
    }

    let outputObj = {}

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

const hasProperty = (obj, propertyName) => {
  return propertyName in obj
}

const transform = {
  benefit: data => {
    return form.benefit(data)
  },
  branch: data => {
    return form.branch(data)
  },
  checkbox: data => {
    return form.checkbox(data)
  },
  checkboxgroup: data => {
    return form.checkboxgroup(data)
  },
  clearancelevel: data => {
    return form.clearancelevel(data)
  },
  collection: data => {
    return form.collection(data)
  },
  contacts: data => {
    return form.contacts(data)
  },
  coowners: data => {
    return form.coowners(data)
  },
  country: data => {
    return form.country(data)
  },
  datecontrol: data => {
    return form.datecontrol(data)
  },
  daterange: data => {
    return form.daterange(data)
  },
  email: data => {
    return form.email(data)
  },
  employmentactivity: data => {
    return form.employmentactivity(data)
  },
  foreignborndocument: data => {
    return form.foreignborndocument(data)
  },
  height: data => {
    return form.height(data)
  },
  location: data => {
    return form.location(data)
  },
  name: data => {
    return form.name(data)
  },
  notapplicable: data => {
    return form.notapplicable(data)
  },
  number: data => {
    return form.number(data)
  },
  physicaladdress: data => {
    return form.physicaladdress(data)
  },
  radio: data => {
    return form.radio(data)
  },
  reasonleft: data => {
    return form.reasonleft(data)
  },
  sentence: data => {
    return form.sentence(data)
  },
  signature: data => {
    return form.signature(data)
  },
  ssn: data => {
    return form.ssn(data)
  },
  supervisor: data => {
    return form.supervisor(data)
  },
  telephone: data => {
    return form.telephone(data)
  },
  text: data => {
    return form.text(data)
  },
  textarea: data => {
    return form.textarea(data)
  },
  'identification.birthdate': data => {
    return section.identificationBirthdate(data)
  },
  'identification.birthplace': data => {
    return section.identificationBirthplace(data)
  },
  'identification.contacts': data => {
    return section.identificationContacts(data)
  },
  'identification.name': data => {
    return section.identificationName(data)
  },
  'identification.othernames': data => {
    return section.identificationOthernames(data)
  },
  'identification.physical': data => {
    return section.identificationPhysical(data)
  },
  'identification.ssn': data => {
    return section.identificationSSN(data)
  },
  'identification.comments': data => {
    return section.identificationComments(data)
  },
  'financial.bankruptcy': data => {
    return section.financialBankruptcy(data)
  },
  'financial.gambling': data => {
    return section.financialGambling(data)
  },
  'financial.taxes': data => {
    return section.financialTaxes(data)
  },
  'financial.card': data => {
    return section.financialCard(data)
  },
  'financial.credit': data => {
    return section.financialCredit(data)
  },
  'financial.delinquent': data => {
    return section.financialDelinquent(data)
  },
  'financial.nonpayment': data => {
    return section.financialNonpayment(data)
  },
  'financial.comments': data => {
    return section.financialComments(data)
  },
  'history.education': data => {
    return section.historyEducation(data)
  },
  'history.employment': data => {
    return section.historyEmployment(data)
  },
  'history.federal': data => {
    return section.historyFederal(data)
  },
  'history.residence': data => {
    return section.historyResidence(data)
  },
  'history.comments': data => {
    return section.historyComments(data)
  },
  'relationships.status.cohabitant': data => {
    return section.relationshipsCohabitants(data)
  },
  'relationships.status.marital': data => {
    return section.relationshipsMarital(data)
  },
  'relationships.people': data => {
    return section.relationshipsPeople(data)
  },
  'relationships.relatives': data => {
    return section.relationshipsRelatives(data)
  },
  'relationships.comments': data => {
    return section.relationshipsComments(data)
  },
  'citizenship.multiple': data => {
    return section.citizenshipMultiple(data)
  },
  'citizenship.passports': data => {
    return section.citizenshipPassports(data)
  },
  'citizenship.status': data => {
    return section.citizenshipStatus(data)
  },
  'citizenship.comments': data => {
    return section.citizenshipComments(data)
  },
  'military.selective': data => {
    return section.militarySelective(data)
  },
  'military.history': data => {
    return section.militaryHistory(data)
  },
  'military.disciplinary': data => {
    return section.militaryDisciplinary(data)
  },
  'military.foreign': data => {
    return section.militaryForeign(data)
  },
  'military.comments': data => {
    return section.militaryComments(data)
  },
  'foreign.activities.benefits': data => {
    return section.foreignActivitiesBenefits(data)
  },
  'foreign.activities.direct': data => {
    return section.foreignActivitiesDirect(data)
  },
  'foreign.activities.indirect': data => {
    return section.foreignActivitiesIndirect(data)
  },
  'foreign.activities.realestate': data => {
    return section.foreignActivitiesRealestate(data)
  },
  'foreign.activities.support': data => {
    return section.foreignActivitiesSupport(data)
  },
  'foreign.business.advice': data => {
    return section.foreignBusinessAdvice(data)
  },
  'foreign.business.conferences': data => {
    return section.foreignBusinessConferences(data)
  },
  'foreign.business.contact': data => {
    return section.foreignBusinessContact(data)
  },
  'foreign.business.employment': data => {
    return section.foreignBusinessEmployment(data)
  },
  'foreign.business.family': data => {
    return section.foreignBusinessFamily(data)
  },
  'foreign.business.political': data => {
    return section.foreignBusinessPolitical(data)
  },
  'foreign.business.sponsorship': data => {
    return section.foreignBusinessSponsorship(data)
  },
  'foreign.business.ventures': data => {
    return section.foreignBusinessVentures(data)
  },
  'foreign.business.voting': data => {
    return section.foreignBusinessVoting(data)
  },
  'foreign.contacts': data => {
    return section.foreignContacts(data)
  },
  'foreign.passport': data => {
    return section.foreignPassport(data)
  },
  'foreign.travel': data => {
    return section.foreignTravel(data)
  },
  'foreign.comments': data => {
    return section.foreignComments(data)
  },
  'substance.alcohol.additional': data => {
    return section.substanceAlcoholAdditional(data)
  },
  'substance.alcohol.negative': data => {
    return section.substanceAlcoholNegative(data)
  },
  'substance.alcohol.ordered': data => {
    return section.substanceAlcoholOrdered(data)
  },
  'substance.alcohol.voluntary': data => {
    return section.substanceAlcoholVoluntary(data)
  },
  'substance.drugs.clearance': data => {
    return section.substanceDrugClearance(data)
  },
  'substance.drugs.misuse': data => {
    return section.substanceDrugMisuse(data)
  },
  'substance.drugs.ordered': data => {
    return section.substanceDrugOrdered(data)
  },
  'substance.drugs.publicsafety': data => {
    return section.substanceDrugPublicSafety(data)
  },
  'substance.drugs.purchase': data => {
    return section.substanceDrugPurchase(data)
  },
  'substance.drugs.usage': data => {
    return section.substanceDrugUsage(data)
  },
  'substance.drugs.voluntary': data => {
    return section.substanceDrugVoluntary(data)
  },
  'substance.comments': data => {
    return section.substanceComments(data)
  },
  'legal.associations.activities-to-overthrow': data => {
    return section.legalAssociationsActivitiesToOverthrow(data)
  },
  'legal.associations.advocating': data => {
    return section.legalAssociationsAdvocating(data)
  },
  'legal.associations.engaged-in-terrorism': data => {
    return section.legalAssociationsEngagedInTerrorism(data)
  },
  'legal.associations.membership-overthrow': data => {
    return section.legalAssociationsMembershipOverthrow(data)
  },
  'legal.associations.membership-violence-or-force': data => {
    return section.legalAssociationsMembershipViolenceOrForce(data)
  },
  'legal.associations.terrorism-association': data => {
    return section.legalAssociationsTerrorismAssociation(data)
  },
  'legal.associations.terrorist-organization': data => {
    return section.legalAssociationsTerroristOrganization(data)
  },
  'legal.court': data => {
    return section.legalCourt(data)
  },
  'legal.investigations.debarred': data => {
    return section.legalInvestigationsDebarred(data)
  },
  'legal.investigations.history': data => {
    return section.legalInvestigationsHistory(data)
  },
  'legal.investigations.revoked': data => {
    return section.legalInvestigationsRevoked(data)
  },
  'legal.police.additionaloffenses': data => {
    return section.legalPoliceAdditionalOffenses(data)
  },
  'legal.police.domesticviolence': data => {
    return section.legalPoliceDomesticViolence(data)
  },
  'legal.police.offenses': data => {
    return section.legalPoliceOffenses(data)
  },
  'legal.technology.manipulating': data => {
    return section.legalTechnologyManipulating(data)
  },
  'legal.technology.unauthorized': data => {
    return section.legalTechnologyUnauthorized(data)
  },
  'legal.technology.unlawful': data => {
    return section.legalTechnologyUnlawful(data)
  },
  'legal.comments': data => {
    return section.legalComments(data)
  },
  'psychological.competence': data => {
    return section.psychologicalCompetence(data)
  },
  'psychological.conditions': data => {
    return section.psychologicalExisting(data)
  },
  'psychological.consultations': data => {
    return section.psychologicalConsultations(data)
  },
  'psychological.diagnoses': data => {
    return section.psychologicalDiagnoses(data)
  },
  'psychological.hospitalizations': data => {
    return section.psychologicalHospitalizations(data)
  },
  'psychological.comments': data => {
    return section.psychologicalComments(data)
  },
  'psychological.treatment': data => {
    return form.treatment(data)
  },
  'package.submit': data => {
    return section.submission(data)
  }
}
