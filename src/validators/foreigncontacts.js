import AddressValidator from './address'
import NameValidator from './name'
import BirthPlaceValidator from './birthplace'
import { validNotApplicable, validGenericTextfield, validDateField,
         BranchCollection } from './helpers'

export default class ForeignContactsValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignContacts = state.HasForeignContacts
    this.list = state.List || []
  }

  validList () {
    if (this.hasForeignContacts === 'No') {
      return true
    }

    if (this.hasForeignContacts === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      return this.list.every(item => new ForeignNationalValidator(item.Item, null).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class ForeignNationalValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.nameNotApplicable = state.NameNotApplicable
    this.nameExplanation = state.NameExplanation
    this.firstContact = state.FirstContact
    this.lastContact = state.LastContact
    this.methods = state.Methods || []
    this.methodsExplanation = state.MethodsExplanation
    this.frequency = state.Frequency
    this.frequencyExplanation = state.FrequencyExplanation
    this.relationship = state.Relationship || []
    this.relationshipExplanation = state.RelationshipExplanation
    this.aliases = state.Aliases || []
    this.citizenship = state.Citizenship
    this.birthdate = state.Birthdate
    this.birthdateNotApplicable = state.BirthdateNotApplicable
    this.birthplace = state.Birthplace
    this.birthplaceNotApplicable = state.BirthplaceNotApplicable
    this.address = state.Address
    this.addressNotApplicable = state.AddressNotApplicable
    this.employer = state.Employer
    this.employerNotApplicable = state.EmployerNotApplicable
    this.employerAddress = state.EmployerAddress
    this.employerAddressNotApplicable = state.EmployerAddressNotApplicable
    this.hasAffiliations = state.HasAffiliations
    this.affiliations = state.Affiliations
  }

  validName () {
    return validNotApplicable(this.nameNotApplicable, () => {
      return new NameValidator(this.name, null).isValid()
    }, () => {
      return validGenericTextfield(this.nameExplanation)
    })
  }

  validFirstContact () {
    return validDateField(this.firstContact)
  }

  validLastContact () {
    return validDateField(this.lastContact)
  }

  validMethods () {
    const choices = ['In person', 'Telephone', 'Electronic', 'Written']
    const wanting = ['Other']
    return !!this.methods && this.methods.length > 0 &&
      this.methods.every(x => choices.includes(x) || wanting.includes(x)) &&
      (this.methods.some(x => wanting.includes(x)) ? validGenericTextfield(this.methodsExplanation) : true)
  }

  validFrequency () {
    const choices = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually', 'Other']
    return choices.includes(this.frequency) &&
      (this.frequency === 'Other' ? validGenericTextfield(this.frequencyExplanation) : true)
  }

  validRelationship () {
    const choices = ['Professional', 'Personal', 'Obligation', 'Other']
    const wanting = ['Obligation', 'Other']
    return !!this.relationship && this.relationship.length > 0 &&
      this.relationship.every(x => choices.includes(x) || wanting.includes(x)) &&
      (this.relationship.some(x => wanting.includes(x)) ? validGenericTextfield(this.relationshipExplanation) : true)
  }

  validAliases () {
    const branchValidator = new BranchCollection(this.aliases)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (branchValidator.hasNo()) {
      return true
    }

    return branchValidator.each(item => {
      return new NameValidator(item.Alias, null).isValid()
    })
  }

  validCitizenship () {
    return !!this.citizenship && !!this.citizenship.value && this.citizenship.value.length > 0
  }

  validBirthdate () {
    return validNotApplicable(this.birthdateNotApplicable, () => {
      return validDateField(this.birthdate)
    })
  }

  validBirthplace () {
    return validNotApplicable(this.birthplaceNotApplicable, () => {
      return !!this.birthplace && new BirthPlaceValidator(this.birthplace, null).isValid()
    })
  }

  validAddress () {
    return validNotApplicable(this.addressNotApplicable, () => {
      return new AddressValidator(this.address, null).isValid()
    })
  }

  validEmployer () {
    return validNotApplicable(this.employerNotApplicable, () => {
      return validGenericTextfield(this.employer)
    })
  }

  validEmployerAddress () {
    return validNotApplicable(this.employerAddressNotApplicable, () => {
      return new AddressValidator(this.employerAddress, null).isValid()
    })
  }

  validAffiliations () {
    if (!this.hasAffiliations) {
      return false
    }

    if (this.hasAffiliations === 'No') {
      return true
    }

    return validGenericTextfield(this.affiliations)
  }

  isValid () {
    return this.validName() &&
      this.validFirstContact() &&
      this.validLastContact() &&
      this.validMethods() &&
      this.validFrequency() &&
      this.validRelationship() &&
      this.validAliases() &&
      this.validCitizenship() &&
      this.validBirthdate() &&
      this.validBirthplace() &&
      this.validAddress() &&
      this.validEmployer() &&
      this.validEmployerAddress() &&
      this.validAffiliations()
  }
}
