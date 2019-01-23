import DateRangeValidator from './daterange'
import { validAccordion, validGenericTextfield } from './helpers'

class CitizenshipMultipleBase {
  constructor(data = {}) {
    this.hasMultiple = (data.HasMultiple || {}).value
    this.list = data.List || {}
  }

  validHasMultiple() {
    return (
      !!this.hasMultiple &&
      (this.hasMultiple === 'Yes' || this.hasMultiple === 'No')
    )
  }

  validMinimumCitizenships() {
    if (this.hasMultiple !== 'Yes') {
      return true
    }

    // Must provide a minimum of two countries
    if (this.list.items && this.list.items.length < 2) {
      return false
    }

    return true
  }

  isValid() {
    return (
      this.validHasMultiple() &&
      this.validMinimumCitizenships() &&
      this.validCitizenships()
    )
  }
}
export default class CitizenshipMultipleValidator extends CitizenshipMultipleBase {
  validCitizenships() {
    if (this.hasMultiple !== 'Yes') {
      return true
    }

    return validAccordion(this.list, item => {
      return new CitizenshipItemValidator(item).isValid()
    })
  }
}


export class CitizenshipMultiple85Validator extends CitizenshipMultipleBase {
  validCitizenships() {
    if (this.hasMultiple !== 'Yes') {
      return true
    }

    return validAccordion(this.list, item => {
      return new CitizenshipItem85Validator(item).isValid()
    })
  }
}

class CitizenshipItemBase {
  constructor(data = {}) {
    this.country = data.Country
    this.dates = data.Dates
    this.how = data.How
    this.renounced = (data.Renounced || {}).value
    this.renouncedExplanation = data.RenouncedExplanation
    this.current = (data.Current || {}).value
    this.currentExplanation = data.CurrentExplanation
  }

  isUnitedStates() {
    if (!this.country || !this.country.value) {
      return true
    }

    return (this.country.value || []).includes('United States')
  }

  validCountry() {
    return validGenericTextfield(this.country)
  }

  validDates() {
    return !!this.dates && new DateRangeValidator(this.dates).isValid()
  }

  validHow() {
    if (this.isUnitedStates()) {
      return true
    }

    return !!this.how && validGenericTextfield(this.how)
  }

  validCurrent() {
    if (!this.dates || this.dates.present) {
      return true
    }

    return (
      !!this.current &&
      (this.current === 'No' || this.current === 'Yes') &&
      validGenericTextfield(this.currentExplanation)
    )
  }
}

export class CitizenshipItemValidator extends CitizenshipItemBase {

  validRenounced() {
    if (this.isUnitedStates()) {
      return true
    }

    return (
      !!this.renounced &&
      (this.renounced === 'No' || this.renounced === 'Yes') &&
      validGenericTextfield(this.renouncedExplanation)
    )
  }

  isValid() {
    return (
      this.validCountry() &&
      this.validDates() &&
      this.validHow() &&
      this.validRenounced() &&
      this.validCurrent()
    )
  }
}

export class CitizenshipItem85Validator extends CitizenshipItemBase {
  isValid() {
    return (
      this.validCountry() &&
      this.validDates() &&
      this.validHow() &&
      this.validCurrent()
    )
  }
}
