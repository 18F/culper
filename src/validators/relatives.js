import NameValidator from './name'
import AddressValidator from './address'
import { validDateField, validGenericTextfield } from './helpers'

export default class RelativesValidator {
  constructor (state = {}, props = {}) {
    this.relations = state.Relations
    this.list = state.List
  }

  validRelations () {
    return this.relations.length > 0
  }

  validItems () {
    if (this.relations.length === 0) {
      return true
    }

    if (this.list.length === 0) {
      return false
    }

    for (const relative of this.list) {
      if (new RelativeValidator(relative.Item, null).isValid() !== true) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validRelations() && this.validItems()
  }
}

export class RelativeValidator {
  constructor (state = {}, props = {}) {
    this.relations = state.Relations
    this.name = state.Name
    this.birthdate = state.Birthdate
    this.birthplace = state.Birthplace
    this.citizen = state.Citizen
    this.maidenName = state.MaidenName
    this.aliases = state.Aliases
    this.isDeceased = state.IsDeceased
    this.address = state.Address
    this.abroad = state.Abroad
    this.naturalized = state.Naturalized
    this.derived = state.Derived
    this.documentNumber = state.DocumentNumber
    this.courtName = state.CourtName
    this.courtAddress = state.CourtAddress
    this.document = state.Document
    this.residenceDocumentNumber = state.ResidenceDocumentNumber
    this.expiration = state.Expiration
    this.firstContact = state.FirstContact
    this.lastContact = state.LastContact
    this.methods = state.Methods
    this.frequency = state.Frequency
    this.employer = state.Employer
    this.employerAddress = state.EmployerAddress
    this.employerRelationship = state.EmployerRelationship
  }

  validRelations () {
    return this.relations.length > 0
  }

  validName () {
    return !!this.name && new NameValidator(this.name, null).isValid()
  }

  validBirthdate () {
    return !!this.birthdate && validDateField(this.birthdate)
  }

  validBirthplace () {
    return !!this.birthplace && new AddressValidator(this.birthplace, null).isValid()
  }

  validCitizen () {
    return false
  }

  validMaidenName () {
    return !!this.maidenName && validGenericTextfield(this.maidenName)
  }

  validAliases () {
    return false
  }

  validIsDeceased () {
    return false
  }

  validAddress () {
    return false
  }

  validAbroad () {
    return false
  }

  validNaturalized () {
    return false
  }

  validDerived () {
    return false
  }

  validDocumentNumber () {
    return false
  }

  validCourtName () {
    return false
  }

  validCourtAddress () {
    return false
  }

  validDocument () {
    return false
  }

  validResidenceDocumentNumber () {
    return false
  }

  validExpiration () {
    return false
  }

  validFirstContact () {
    return false
  }

  validLastContact () {
    return false
  }

  validMethods () {
    return false
  }

  validFrequency () {
    return false
  }

  validEmployer () {
    return false
  }

  validEmployerAddress () {
    return false
  }

  validEmployerRelationship () {
    return false
  }

  isValid () {
    return this.validRelations() &&
      this.validName() &&
      this.validBirthdate() &&
      this.validBirthplace() &&
      this.validCitizen() &&
      this.validMaidenName() &&
      this.validAliases() &&
      this.validIsDeceased() &&
      this.validAddress() &&
      this.validAbroad() &&
      this.validNaturalized() &&
      this.validDerived() &&
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
  }
}
