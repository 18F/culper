import { validateModel, hasYesOrNo } from 'models/validate'
import name from 'models/shared/name'

const otherNameModel = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  MaidenName: { presence: true, hasValue: { validator: hasYesOrNo } },
  DatesUsed: { presence: true, daterange: true },
  Reason: { presence: true, hasValue: true },
}

const otherNamesModel = {
  HasOtherNames: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasOtherNames
      && attributes.HasOtherNames.value
      && attributes.HasOtherNames.value === 'No') return {}

    return {
      presence: true,
      accordion: { validator: otherNameModel },
    }
  },
}

export const validateOtherName = data => (
  validateModel(data, otherNameModel) === true
)

export const validateOtherNames = data => (
  validateModel(data, otherNamesModel) === true
)

export default class OtherNamesValidator {
  constructor(data = {}) {
    this.data = data
  }

  /**
   * Validates that proper values were included for branching
   */
  validHasOtherNames() {
    return validateModel(this.data, { HasOtherNames: otherNamesModel.HasOtherNames }) === true
  }

  /**
   * Checks if any of the other names is valid
   */
  validOtherNames() {
    return validateModel(this.data, {
      List: otherNamesModel.List,
    }) === true
  }

  /**
   * Validates the branching hasOtherNames property and all other name values
   */
  isValid() {
    return validateOtherNames(this.data)
  }
}

/**
 * Validates a single instance of an other name
 */
export class OtherNameValidator {
  constructor(data = {}) {
    this.data = data
  }

  /**
   * Validates a name
   */
  validName() {
    return validateModel(this.data, { Name: otherNameModel.Name }) === true
  }

  /**
   * Validates a maiden name
   */
  validMaidenName() {
    return validateModel(this.data, { MaidenName: otherNameModel.MaidenName }) === true
  }

  /**
   * Validates the other names dates used
   */
  validDatesUsed() {
    return validateModel(this.data, { DatesUsed: otherNameModel.DatesUsed }) === true
  }

  validReason() {
    return validateModel(this.data, { Reason: otherNameModel.Reason }) === true
  }

  /**
   * Validates all portions of an other name
   */
  isValid() {
    return validateOtherName(this.data)
  }
}
