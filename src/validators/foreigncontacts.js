import { validateModel, hasYesOrNo } from 'models/validate'
import foreignContact from 'models/foreignContact'

export const validateForeignContact = data => validateModel(data, foreignContact) === true

export const validateForeignContacts = (data) => {
  const foreignContactsModel = {
    HasForeignContacts: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignContacts && attributes.HasForeignContacts.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignContact },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignContactsModel) === true
}

export default class ForeignContactsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignContacts(this.data)
  }
}

export class ForeignNationalValidator {
  constructor(data = {}) {
    this.data = data
  }

  validName() {
    return validateModel(this.data, {
      Name: foreignContact.Name,
      NameNotApplicable: foreignContact.NameNotApplicable,
      NameExplanation: foreignContact.NameExplanation,
    }) === true
  }

  validFirstContact() {
    return validateModel(this.data, {
      FirstContact: foreignContact.FirstContact,
    }) === true
  }

  validLastContact() {
    return validateModel(this.data, {
      LastContact: foreignContact.LastContact,
    }) === true
  }

  validMethods() {
    return validateModel(this.data, {
      Methods: foreignContact.Methods,
      MethodsExplanation: foreignContact.MethodsExplanation,
    }) === true
  }

  validFrequency() {
    return validateModel(this.data, {
      Frequency: foreignContact.Frequency,
      FrequencyExplanation: foreignContact.FrequencyExplanation,
    }) === true
  }

  validRelationship() {
    return validateModel(this.data, {
      Relationship: foreignContact.Relationship,
      RelationshipExplanation: foreignContact.RelationshipExplanation,
    }) === true
  }

  validAliases() {
    return validateModel(this.data, {
      Aliases: foreignContact.Aliases,
    }) === true
  }

  validCitizenship() {
    return validateModel(this.data, {
      Citizenship: foreignContact.Citizenship,
    }) === true
  }

  validBirthdate() {
    return validateModel(this.data, {
      Birthdate: foreignContact.Birthdate,
      BirthdateNotApplicable: foreignContact.BirthdateNotApplicable,
    }) === true
  }

  validBirthplace() {
    return validateModel(this.data, {
      Birthplace: foreignContact.Birthplace,
      BirthplaceNotApplicable: foreignContact.BirthplaceNotApplicable,
    }) === true
  }

  validAddress() {
    return validateModel(this.data, {
      Address: foreignContact.Address,
      AddressNotApplicable: foreignContact.AddressNotApplicable,
    }) === true
  }

  validEmployer() {
    return validateModel(this.data, {
      Employer: foreignContact.Employer,
      EmployerNotApplicable: foreignContact.EmployerNotApplicable,
    }) === true
  }

  validEmployerAddress() {
    return validateModel(this.data, {
      EmployerAddress: foreignContact.EmployerAddress,
      EmployerAddressNotApplicable: foreignContact.EmployerAddressNotApplicable,
    }) === true
  }

  validAffiliations() {
    return validateModel(this.data, {
      HasAffiliations: foreignContact.HasAffiliations,
      Affiliations: foreignContact.Affiliations,
    }) === true
  }

  isValid() {
    return validateForeignContact(this.data)
  }
}
