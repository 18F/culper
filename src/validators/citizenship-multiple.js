import DateRangeValidator from './daterange'
import { validAccordion, validGenericTextfield } from './helpers'

export default class CitizenshipMultipleValidator {
  constructor (data = {}) {
    this.hasMultiple = (data.HasMultiple || {}).value
    this.list = data.List || {}
  }

  validHasMultiple () {
    return !!this.hasMultiple && (this.hasMultiple === 'Yes' || this.hasMultiple === 'No')
  }

  validCitizenships () {
    if (this.hasMultiple !== 'Yes') {
      return true
    }

    return validAccordion(this.list, (item) => {
      return new CitizenshipItemValidator(item).isValid()
    })
  }

  isValid () {
    return this.validHasMultiple() &&
      this.validCitizenships()
  }
}

export class CitizenshipItemValidator {
  constructor (data = {}) {
    this.country = data.Country
    this.dates = data.Dates
    this.how = data.How
    this.renounced = (data.Renounced || {}).value
    this.renouncedExplanation = data.RenouncedExplanation
    this.current = (data.Current || {}).value
    this.currentExplanation = data.CurrentExplanation
  }

  validCountry () {
    return validGenericTextfield(this.country)
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates).isValid()
  }

  validHow () {
    return !!this.how && validGenericTextfield(this.how)
  }

  validRenounced () {
    return !!this.renounced &&
      (this.renounced === 'No' || this.renounced === 'Yes') &&
      validGenericTextfield(this.renouncedExplanation)
  }

  validCurrent () {
    if (!this.dates || this.dates.present) {
      return true
    }

    return !!this.current &&
      (this.current === 'No' || this.current === 'Yes') &&
      validGenericTextfield(this.currentExplanation)
  }

  isValid () {
    return this.validCountry() &&
      this.validDates() &&
      this.validHow() &&
      this.validRenounced() &&
      this.validCurrent()
  }
}
