import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessVentures from 'models/foreignBusinessVentures'

export const validateVentures = data => validateModel(data, foreignBusinessVentures)

export const validateForeignBusinessVentures = (data) => {
  const foreignBusinessVenturesModel = {
    HasForeignVentures: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignVentures && attributes.HasForeignVentures.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessVentures },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessVenturesModel)
}

export default class ForeignBusinessVenturesValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignBusinessVentures(this.data) === true
  }
}

export class VenturesValidator {
  constructor(data = {}) {
    this.data = data
  }

  validName() {
    return validateModel(this.data, {
      Name: foreignBusinessVentures.Name,
    }) === true
  }

  validAddress() {
    return validateModel(this.data, {
      Address: foreignBusinessVentures.Address,
    }) === true
  }

  validCitizenship() {
    return validateModel(this.data, {
      Citizenship: foreignBusinessVentures.Citizenship,
    }) === true
  }

  validDescription() {
    return validateModel(this.data, {
      Description: foreignBusinessVentures.Description,
    }) === true
  }

  validRelationship() {
    return validateModel(this.data, {
      Relationship: foreignBusinessVentures.Relationship,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: foreignBusinessVentures.Dates,
    }) === true
  }

  validAssociation() {
    return validateModel(this.data, {
      Association: foreignBusinessVentures.Association,
    }) === true
  }

  validPosition() {
    return validateModel(this.data, {
      Position: foreignBusinessVentures.Position,
    }) === true
  }

  validService() {
    return validateModel(this.data, {
      Service: foreignBusinessVentures.Service,
    }) === true
  }

  validSupport() {
    return validateModel(this.data, {
      Support: foreignBusinessVentures.Support,
    }) === true
  }

  validCompensation() {
    return validateModel(this.data, {
      Compensation: foreignBusinessVentures.Compensation,
    }) === true
  }

  isValid() {
    return validateVentures(this.data) === true
  }
}
