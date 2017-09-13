import DateRangeValidator from './daterange'
import { validGenericTextfield } from './helpers'

export default class CitizenshipMultipleValidator {
  constructor (data = {}) {
    this.hasMultiple = data.HasMultiple
    this.citizenships = data.Citizenships || []
    this.citizenshipsBranch = data.CitizenshipsBranch
  }

  validHasMultiple () {
    return !!this.hasMultiple && (this.hasMultiple === 'Yes' || this.hasMultiple === 'No')
  }

  validCitizenships () {
    if (this.hasMultiple !== 'Yes') {
      return true
    }

    if (this.citizenships.length === 0) {
      return false
    }

    if (this.citizenshipsBranch !== 'No') {
      return false
    }

    for (const citizenship of this.citizenships) {
      if (new CitizenshipItemValidator(citizenship.Item).isValid() !== true) {
        return false
      }
    }

    return true
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
    this.renounced = data.Renounced
    this.renouncedExplanation = data.RenouncedExplanation
    this.current = data.Current
    this.currentExplanation = data.CurrentExplanation
  }

  validCountry () {
    return validGenericTextfield(this.country)
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
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
    if (!this.dates || !this.dates.present) {
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
