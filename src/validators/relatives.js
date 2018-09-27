import NameValidator from './name'
import LocationValidator, { isInternational, countryString } from './location'
import DateRangeValidator from './daterange'
import {
  validAccordion,
  validDateField,
  validGenericTextfield
} from './helpers'

export default class RelativesValidator {
  constructor(data = {}) {
    this.list = data.List || {}
  }

  validItems() {
    return validAccordion(this.list, item => {
      return new RelativeValidator(item).isValid()
    })
  }

  validMinimumRelations() {
    const requiredRelations = ['Father', 'Mother']

    if ((this.list.branch || {}).value === 'No') {
      if (this.list.items && this.list.items.length > 0) {
        let relations = []
        for (const item of this.list.items) {
          if (!item || !item.Item || !item.Item.Relation) {
            continue
          }
          relations.push(item.Item.Relation.value)
        }
        if (relations.length > 0) {
          return requiredRelations.every(r => relations.includes(r))
        }
      }
      return false
    }
    return true
  }

  isValid() {
    return this.validItems() && this.validMinimumRelations()
  }
}

export class RelativeValidator {
  constructor(data = {}) {
    this.relation = (data.Relation || {}).value
    this.name = data.Name
    this.birthdate = data.Birthdate
    this.birthplace = data.Birthplace
    this.citizenship = (data.Citizenship || {}).value || []
    this.maidenSameAsListed = (data.MaidenSameAsListed || {}).value
    this.maidenName = data.MaidenName || {}
    this.aliases = data.Aliases || {}
    this.isDeceased = (data.IsDeceased || {}).value
    this.address = data.Address
    this.citizenshipDocumentation = (data.CitizenshipDocumentation || {}).value
    this.otherCitizenshipDocumentation = data.OtherCitizenshipDocumentation
    this.documentNumber = data.DocumentNumber
    this.courtName = data.CourtName
    this.courtAddress = data.CourtAddress
    this.document = (data.Document || {}).value
    this.otherDocument = data.OtherDocument
    this.residenceDocumentNumber = data.ResidenceDocumentNumber
    this.expiration = data.Expiration
    this.firstContact = data.FirstContact
    this.lastContact = data.LastContact
    this.methods = (data.Methods || {}).values || []
    this.methodsComments = (data.MethodsComments || {}).value
    this.frequency = (data.Frequency || {}).value
    this.frequencyComments = data.FrequencyComments
    this.employer = data.Employer
    this.employerAddress = data.EmployerAddress
    this.hasAffiliation = (data.HasAffiliation || {}).value
    this.employerRelationship = data.EmployerRelationship
  }

  citizen() {
    return (
      !!this.citizenship &&
      !!this.citizenship.length &&
      this.citizenship.some(x => x === 'United States')
    )
  }

  currentResident() {
    return countryString((this.address || {}).country || {}) === 'United States'
  }

  requiresCitizenshipDocumentation() {
    const relations = [
      'Father',
      'Mother',
      'Child',
      'Stepchild',
      'Brother',
      'Sister',
      'Half-brother',
      'Half-sister',
      'Stepbrother',
      'Stepsister',
      'Stepmother',
      'Stepfather'
    ]
    const citizen = this.citizen()
    const international =
      countryString((this.birthplace || {}).country || {}) !== 'United States'
    const mailingCountry = countryString((this.address || {}).country || {})

    // If no citizenship information has been given we don't know if documentation
    // is required.
    if ((this.citizenship || []).length === 0) {
      return false
    }

    if (
      this.relation &&
      relations.includes(this.relation) &&
      citizen &&
      international &&
      this.isDeceased === 'Yes'
    ) {
      return true
    }

    if (
      this.address &&
      mailingCountry === 'United States' &&
      international &&
      citizen
    ) {
      return true
    }

    if (
      this.address &&
      mailingCountry === 'POSTOFFICE' &&
      international &&
      citizen
    ) {
      return true
    }

    if (this.birthplace && international && citizen) {
      return true
    }

    return false
  }

  validRelation() {
    return !!this.relation && this.relation.length > 0
  }

  validName() {
    return !!this.name && new NameValidator(this.name).isValid()
  }

  validBirthdate() {
    return !!this.birthdate && validDateField(this.birthdate)
  }

  validBirthplace() {
    return !!this.birthplace && new LocationValidator(this.birthplace).isValid()
  }

  validCitizenship() {
    return !!this.citizenship && this.citizenship.length > 0
  }

  validMaidenName() {
    if (this.relation !== 'Mother') {
      return true
    }

    if (!!this.maidenSameAsListed && this.maidenSameAsListed === 'Yes') {
      return true
    }

    return !!this.maidenName && new NameValidator(this.maidenName).isValid()
  }

  validAliases() {
    const items = this.aliases.items || []
    const nonImmediateFamily = [
      'Fosterparent',
      'Father-in-law',
      'Mother-in-law',
      'Guardian'
    ]

    if (nonImmediateFamily.includes(this.relation)) {
      return true
    }

    if (items.length === 0) {
      return false
    }

    for (const alias of items) {
      const item = alias.Item || {}
      const has =
        !!item.Has && (item.Has.value === 'No' || item.Has.value === 'Yes')
      if (has && item.Has.value === 'No') {
        continue
      }

      const data = { hideMaiden: this.relation === 'Mother', ...item }
      if (has && new AliasValidator(data).isValid() === false) {
        return false
      }
    }

    return true
  }

  validIsDeceased() {
    return (
      !!this.isDeceased &&
      (this.isDeceased === 'No' || this.isDeceased === 'Yes')
    )
  }

  validAddress() {
    if (!this.isDeceased) {
      return false
    }

    if (this.isDeceased === 'Yes') {
      return true
    }

    return !!this.address && new LocationValidator(this.address).isValid()
  }

  validCitizenshipDocumentation() {
    if (!this.requiresCitizenshipDocumentation()) {
      return true
    }

    switch (this.citizenshipDocumentation) {
      case 'Other':
        return validGenericTextfield(this.otherCitizenshipDocumentation)
      case 'FS':
      case 'DS':
      case 'NaturalizedAlien':
      case 'NaturalizedPermanent':
      case 'NaturalizedCertificate':
      case 'DerivedAlien':
      case 'DerivedPermanent':
      case 'DerivedCertificate':
        return true
      default:
        return false
    }
  }

  validDocumentNumber() {
    if (!this.requiresCitizenshipDocumentation()) {
      return true
    }

    return validGenericTextfield(this.documentNumber)
  }

  validCourtName() {
    if (!this.requiresCitizenshipDocumentation()) {
      return true
    }

    return validGenericTextfield(this.courtName)
  }

  validCourtAddress() {
    if (!this.requiresCitizenshipDocumentation()) {
      return true
    }

    return new LocationValidator(this.courtAddress).isValid()
  }

  validDocument() {
    if (
      this.citizen() ||
      !this.currentResident() ||
      this.isDeceased === 'Yes'
    ) {
      return true
    }

    switch (this.document) {
      case 'Other':
        return validGenericTextfield(this.otherDocument)
      case 'Permanent':
      case 'Employment':
      case 'Arrival':
      case 'Visa':
      case 'F1':
      case 'J1':
        return true
      default:
        return false
    }
  }

  validResidenceDocumentNumber() {
    if (
      this.citizen() ||
      !this.currentResident() ||
      this.isDeceased === 'Yes'
    ) {
      return true
    }

    return (
      !!this.residenceDocumentNumber &&
      validGenericTextfield(this.residenceDocumentNumber)
    )
  }

  validExpiration() {
    if (
      this.citizen() ||
      !this.currentResident() ||
      this.isDeceased === 'Yes'
    ) {
      return true
    }

    return !!this.expiration && validDateField(this.expiration)
  }

  validFirstContact() {
    if (this.citizen() || this.isDeceased === 'Yes') {
      return true
    }

    return (
      !!this.firstContact &&
      validDateField(this.firstContact) &&
      this.validAddress(this.address)
    )
  }

  validLastContact() {
    if (this.citizen() || this.isDeceased === 'Yes') {
      return true
    }

    return (
      !!this.lastContact &&
      validDateField(this.lastContact) &&
      this.validAddress(this.address)
    )
  }

  validMethods() {
    if (this.citizen() || this.isDeceased === 'Yes') {
      return true
    }

    return (
      this.methods.length > 0 &&
      ((this.methods.some(x => x === 'Other') &&
        !!this.methodsComments &&
        this.methodsComments.length > 0 &&
        this.validAddress(this.address)) ||
        this.methods.every(x => x !== 'Other'))
    )
  }

  validFrequency() {
    if (this.citizen() || this.isDeceased === 'Yes') {
      return true
    }

    return (
      !!this.frequency &&
      this.frequency.length > 0 &&
      ((this.frequency === 'Other' &&
        !!this.frequencyComments &&
        this.frequencyComments.length > 0 &&
        this.validAddress(this.address)) ||
        this.frequency !== 'Other')
    )
  }

  validEmployer() {
    if (this.citizen() || this.isDeceased === 'Yes') {
      return true
    }

    if (this.address && !isInternational(this.address)) {
      return true
    }

    return !!this.employer && validGenericTextfield(this.employer)
  }

  validEmployerAddress() {
    if (this.citizen() || this.isDeceased === 'Yes') {
      return true
    }

    if (this.address && !isInternational(this.address)) {
      return true
    }

    return (
      !!this.employerAddress &&
      new LocationValidator(this.employerAddress).isValid()
    )
  }

  validEmployerRelationship() {
    if (this.citizen() || this.isDeceased === 'Yes') {
      return true
    }

    if (this.address && !isInternational(this.address)) {
      return true
    }

    if (!this.hasAffiliation) {
      return false
    }

    if (this.hasAffiliation === 'No') {
      return true
    }

    return (
      !!this.employerRelationship &&
      validGenericTextfield(this.employerRelationship)
    )
  }

  isValid() {
    return (
      this.validRelation() &&
      this.validName() &&
      this.validBirthdate() &&
      this.validBirthplace() &&
      this.validCitizenship() &&
      this.validMaidenName() &&
      this.validAliases() &&
      this.validIsDeceased() &&
      this.validAddress() &&
      this.validCitizenshipDocumentation() &&
      this.validDocumentNumber() &&
      this.validCourtName() &&
      this.validCourtAddress() &&
      this.validDocument() &&
      this.validResidenceDocumentNumber() &&
      this.validExpiration() &&
      this.validFirstContact() &&
      this.validLastContact() &&
      this.validMethods() &&
      this.validFrequency() &&
      this.validEmployer() &&
      this.validEmployerAddress() &&
      this.validEmployerRelationship()
    )
  }
}

export class AliasValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.maidenName = (data.MaidenName || {}).value
    this.dates = data.Dates
    this.reason = data.Reason
    this.hideMaiden = data.hideMaiden
  }

  validName() {
    return !!this.name && new NameValidator(this.name).isValid()
  }

  validMaidenName() {
    if (this.hideMaiden) {
      return true
    }

    return (
      !!this.maidenName &&
      (this.maidenName === 'No' || this.maidenName === 'Yes')
    )
  }

  validDates() {
    return !!this.dates && new DateRangeValidator(this.dates).isValid()
  }

  validReason() {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  isValid() {
    return (
      this.validName() &&
      this.validMaidenName() &&
      this.validDates() &&
      this.validReason()
    )
  }
}
