import { validateModel } from 'models/validate'
import name from 'models/shared/name'
import identificationOtherNames from 'models/sections/identificationOtherNames'

const otherNameModel = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  MaidenName: { presence: true, hasValue: true },
  DatesUsed: { presence: true, daterange: true },
  Reason: { presence: true, hasValue: true },
}

export const validateOtherName = data => (
  validateModel(data, otherNameModel) === true
)

export const validateOtherNames = data => (
  validateModel(data, identificationOtherNames) === true
)

export default class OtherNamesValidator {
  constructor(data = {}) {
    this.data = data
  }

  /**
   * Validates that proper values were included for branching
   */
  validHasOtherNames() {
    return validateModel(this.data, { HasOtherNames: identificationOtherNames.HasOtherNames }) === true
  }

  /**
   * Checks if any of the other names is valid
   */
  validOtherNames() {
    return validateModel(this.data, {
      List: identificationOtherNames.List,
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
