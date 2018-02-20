import LocationValidator from './location'
import NameValidator from './name'
import BirthPlaceValidator from './birthplace'
import { validAccordion, validNotApplicable, validGenericTextfield, validDateField,
         BranchCollection } from './helpers'

export default class ForeignContactsValidator {
  constructor (data = {}) {
    this.hasForeignContacts = (data.HasForeignContacts || {}).value
    this.list = data.List || {}
  }

  validList () {
    if (this.hasForeignContacts === 'No') {
      return true
    }

    return validAccordion(this.list, (item) => {
      return new ForeignNationalValidator(item).isValid()
    })
  }

  isValid () {
    return this.validList()
  }
}

export class ForeignNationalValidator {
  constructor (data = {}) {
    this.name = data.Name
    this.nameNotApplicable = data.NameNotApplicable
    this.nameExplanation = data.NameExplanation
    this.firstContact = data.FirstContact
    this.lastContact = data.LastContact
    this.methods = (data.Methods || {}).values || []
    this.methodsExplanation = data.MethodsExplanation
    this.frequency = (data.Frequency || {}).value
    this.frequencyExplanation = data.FrequencyExplanation
    this.relationship = (data.Relationship || {}).values || []
    this.relationshipExplanation = data.RelationshipExplanation
    this.aliases = data.Aliases || {}
    this.citizenship = data.Citizenship
    this.birthdate = data.Birthdate
    this.birthdateNotApplicable = data.BirthdateNotApplicable
    this.birthplace = data.Birthplace
    this.birthplaceNotApplicable = data.BirthplaceNotApplicable
    this.address = data.Address
    this.addressNotApplicable = data.AddressNotApplicable
    this.employer = data.Employer
    this.employerNotApplicable = data.EmployerNotApplicable
    this.employerAddress = data.EmployerAddress
    this.employerAddressNotApplicable = data.EmployerAddressNotApplicable
    this.hasAffiliations = (data.HasAffiliations || {}).value
    this.affiliations = data.Affiliations
  }

  validName () {
    return validNotApplicable(this.nameNotApplicable, () => {
      return new NameValidator(this.name).isValid()
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
    return this.methods && this.methods.length > 0 &&
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
      return new NameValidator(item.Alias).isValid()
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
      return !!this.birthplace && new BirthPlaceValidator(this.birthplace).isValid()
    })
  }

  validAddress () {
    return validNotApplicable(this.addressNotApplicable, () => {
      return new LocationValidator(this.address).isValid()
    })
  }

  validEmployer () {
    return validNotApplicable(this.employerNotApplicable, () => {
      return validGenericTextfield(this.employer)
    })
  }

  validEmployerAddress () {
    return validNotApplicable(this.employerAddressNotApplicable, () => {
      return new LocationValidator(this.employerAddress).isValid()
    })
  }

  validAffiliations () {
    if (!this.hasAffiliations) {
      return false
    }

    if (this.hasAffiliations === 'No' || this.hasAffiliations === 'I don\'t know') {
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
