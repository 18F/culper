import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessConferences from 'models/foreignBusinessConferences'

export const validateConferences = data => validateModel(data, foreignBusinessConferences) === true

export const validateForeignBusinessConferences = (data) => {
  const foreignBusinessConferencesModel = {
    HasForeignConferences: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignConferences && attributes.HasForeignConferences.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessConferences },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessConferencesModel) === true
}

export default class ForeignBusinessConferencesValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignBusinessConferences(this.data)
  }
}

export class ConferencesValidator {
  constructor(data = {}) {
    this.data = data
    this.description = data.Description
    this.sponsor = data.Sponsor
    this.city = data.City
    this.country = data.Country
    this.dates = data.Dates
    this.purpose = data.Purpose
    this.contacts = data.Contacts
  }

  validDescription() {
    return validateModel(this.data, {
      Description: foreignBusinessConferences.Description,
    }) === true
  }

  validSponsor() {
    return validateModel(this.data, {
      Sponsor: foreignBusinessConferences.Sponsor,
    }) === true
  }

  validCity() {
    return validateModel(this.data, {
      City: foreignBusinessConferences.City,
    }) === true
  }

  validCountry() {
    return validateModel(this.data, {
      Country: foreignBusinessConferences.Country,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: foreignBusinessConferences.Dates,
    }) === true
  }

  validPurpose() {
    return validateModel(this.data, {
      Purpose: foreignBusinessConferences.Purpose,
    }) === true
  }

  validContacts() {
    return validateModel(this.data, {
      Contacts: foreignBusinessConferences.Contacts,
    }) === true
  }

  isValid() {
    return validateConferences(this.data)
  }
}
