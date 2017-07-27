import DateRangeValidator from './daterange'
import LocationValidator from './location'
import NameValidator from './name'
import { validGenericTextfield, validDateField, BranchCollection } from './helpers'

export default class CitizenshipMultipleValidator {
  constructor (state = {}, props = {}) {
    this.hasMultiple = state.HasMultiple
    this.citizenships = state.Citizenships || []
    this.citizenshipsBranch = state.CitizenshipsBranch
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
      if (new CitizenshipItemValidator(citizenship.Item, null).isValid() !== true) {
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
  constructor (state = {}, props = {}) {
    this.country = state.Country
    this.dates = state.Dates
    this.how = state.How
    this.renounced = state.Renounced
    this.renouncedExplanation = state.RenouncedExplanation
    this.current = state.Current
    this.currentExplanation = state.CurrentExplanation
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
