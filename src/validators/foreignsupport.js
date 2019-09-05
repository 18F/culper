import { validateModel, hasYesOrNo } from 'models/validate'
import foreignSupport from 'models/foreignSupport'

export const validateSupport = data => (
  validateModel(data, foreignSupport)
)

export const validateForeignActivitiesSupport = (data) => {
  const foreignActivitiesSupportModel = {
    HasForeignSupport: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignSupport && attributes.HasForeignSupport.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignSupport },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignActivitiesSupportModel)
}

export default class ForeignActivitiesSupportValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignActivitiesSupport(this.data) === true
  }
}

export class SupportValidator {
  constructor(data = {}) {
    this.data = data
  }

  validName() {
    return validateModel(this.data, {
      Name: foreignSupport.Name,
    }) === true
  }

  validAddress() {
    return validateModel(this.data, {
      Address: foreignSupport.Address,
    }) === true
  }

  validRelationship() {
    return validateModel(this.data, {
      Relationship: foreignSupport.Relationship,
    }) === true
  }

  validAmount() {
    return validateModel(this.data, {
      Amount: foreignSupport.Amount,
    }) === true
  }

  validFrequency() {
    return validateModel(this.data, {
      Frequency: foreignSupport.Frequency,
    }) === true
  }

  validCitizenship() {
    return validateModel(this.data, {
      Citizenship: foreignSupport.Citizenship,
    }) === true
  }

  isValid() {
    return validateSupport(this.data) === true
  }
}
