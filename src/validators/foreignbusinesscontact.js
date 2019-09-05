import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessContact from 'models/foreignBusinessContact'

export const validateContact = data => validateModel(data, foreignBusinessContact)

export const validateForeignBusinessContacts = (data) => {
  const foreignBusinessContactsModel = {
    HasForeignContact: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignContact && attributes.HasForeignContact.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessContact },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessContactsModel)
}

export default class ForeignBusinessContactValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignBusinessContacts(this.data) === true
  }
}

export class ContactValidator {
  constructor(data = {}) {
    this.data = data
  }

  validName() {
    return validateModel(this.data, {
      Name: foreignBusinessContact.Name,
    }) === true
  }

  validLocation() {
    return validateModel(this.data, {
      Location: foreignBusinessContact.Location,
    }) === true
  }

  validDate() {
    return validateModel(this.data, {
      Date: foreignBusinessContact.Date,
    }) === true
  }

  validGovernments() {
    return validateModel(this.data, {
      Governments: foreignBusinessContact.Governments,
    }) === true
  }

  validEstablishment() {
    return validateModel(this.data, {
      Establishment: foreignBusinessContact.Establishment,
    }) === true
  }

  validRepresentatives() {
    return validateModel(this.data, {
      Representatives: foreignBusinessContact.Representatives,
    }) === true
  }

  validPurpose() {
    return validateModel(this.data, {
      Purpose: foreignBusinessContact.Purpose,
    }) === true
  }

  validSubsequentContacts() {
    return validateModel(this.data, {
      SubsequentContacts: foreignBusinessContact.SubsequentContacts,
    }) === true
  }

  isValid() {
    return validateContact(this.data) === true
  }
}
