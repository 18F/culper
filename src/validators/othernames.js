import NameValidator from './name'

export default class OtherNamesValidator {
  constructor (state, props) {
    this.hasOtherNames = state.HasOtherNames
    this.list = state.List
  }

  /**
   * Validates that proper values were included for branching
   */
  validHasOtherNames () {
    if (!this.hasOtherNames) {
      return false
    }

    if (!(this.hasOtherNames === 'Yes' || this.hasOtherNames === 'No')) {
      return false
    }

    return true
  }

  /**
   * Checks if any of the other names is valid
   */
  validOtherNames () {
    if (this.hasOtherNames === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    for (let otherName of this.list) {
      const result = new OtherNameValidator(otherName, null).isValid()
      if (!result) {
        return false
      }
    }
    return true
  }

  /**
   * Validates the branching hasOtherNames property and all other name values
   */
  isValid () {
    return this.validHasOtherNames() &&
      this.validOtherNames()
  }
}

/**
 * Validates a single instance of an other name
 */
export class OtherNameValidator {
  constructor (state, props) {
    this.name = state.Name
    this.maidenName = state.MaidenName
    this.datesUsed = state.DatesUsed
  }

  /**
   * Validates a name
   */
  validName () {
    return new NameValidator(this.name).isValid()
  }

  /**
   * Validates a maiden name
   */
  validMaidenName () {
    if (!this.maidenName || !this.maidenName.value) {
      return false
    }
    return true
  }

  /**
   * Validates the other names dates used
   */
  validDatesUsed () {
    if (!this.datesUsed || !this.datesUsed.from || (!this.datesUsed.to && !this.datesUsed.present)) {
      return false
    }
    return true
  }

  /**
   * Validates all portions of an other name
   */
  isValid () {
    return this.validName() &&
      this.validMaidenName() &&
      this.validDatesUsed()
  }
}
