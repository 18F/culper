import NameValidator from './name'
import { validAccordion, validGenericTextfield } from './helpers'
import DateRangeValidator from './daterange'

export default class OtherNamesValidator {
  constructor(data = {}) {
    this.hasOtherNames = (data.HasOtherNames || {}).value
    this.list = data.List || {}
  }

  /**
   * Validates that proper values were included for branching
   */
  validHasOtherNames() {
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
  validOtherNames() {
    if (this.hasOtherNames === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new OtherNameValidator(item).isValid()
    })
  }

  /**
   * Validates the branching hasOtherNames property and all other name values
   */
  isValid() {
    return this.validHasOtherNames() && this.validOtherNames()
  }
}

/**
 * Validates a single instance of an other name
 */
export class OtherNameValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.maidenName = data.MaidenName
    this.datesUsed = data.DatesUsed
    this.reason = data.Reason
  }

  /**
   * Validates a name
   */
  validName() {
    return new NameValidator(this.name).isValid()
  }

  /**
   * Validates a maiden name
   */
  validMaidenName() {
    if (!this.maidenName || !this.maidenName.value) {
      return false
    }
    return true
  }

  /**
   * Validates the other names dates used
   */
  validDatesUsed() {
    return new DateRangeValidator(this.datesUsed).isValid()
  }

  validReason() {
    return validGenericTextfield(this.reason)
  }

  /**
   * Validates all portions of an other name
   */
  isValid() {
    return (
      this.validName() &&
      this.validMaidenName() &&
      this.validDatesUsed() &&
      this.validReason()
    )
  }
}
