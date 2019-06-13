import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessFamily from 'models/foreignBusinessFamily'

export const validateFamily = data => validateModel(data, foreignBusinessFamily) === true

export const validateForeignBusinessFamily = (data) => {
  const foreignBusinessFamilyModel = {
    HasForeignFamily: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignFamily && attributes.HasForeignFamily.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessFamily },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessFamilyModel) === true
}

export default class ForeignBusinessFamilyValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignBusinessFamily(this.data)
  }
}

export class FamilyValidator {
  constructor(data = {}) {
    this.data = data
  }

  validName() {
    return validateModel(this.data, {
      Name: foreignBusinessFamily.Name,
    }) === true
  }

  validAgency() {
    return validateModel(this.data, {
      Agency: foreignBusinessFamily.Agency,
    }) === true
  }

  validCountry() {
    return validateModel(this.data, {
      Country: foreignBusinessFamily.Country,
    }) === true
  }

  validDate() {
    return validateModel(this.data, {
      Date: foreignBusinessFamily.Date,
    }) === true
  }

  validCircumstances() {
    return validateModel(this.data, {
      Circumstances: foreignBusinessFamily.Circumstances,
    }) === true
  }

  isValid() {
    return validateFamily(this.data)
  }
}
