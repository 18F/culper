import DateRangeValidator from './daterange'
import { validAccordion, validGenericTextfield } from './helpers'

/** Helper functions */
const isUnitedStates = (country) => {
  if (!country || !country.value) { return true }

  return country.value.includes('United States')
}

/** Attribute Validators */
const validateCountry = country => validGenericTextfield(country)

const validateDates = dates => !!dates && new DateRangeValidator(dates).isValid()

const validateHow = how => !!how && validGenericTextfield(how)

const validateRenounced = (renounced, renouncedExplanation) => (
  !!renounced
    && (renounced === 'No' || renounced === 'Yes')
    && validGenericTextfield(renouncedExplanation)
)

const validateCurrent = (dates, current, currentExplanation) => {
  if (!dates || dates.present) { return true }

  return !!current
    && (current === 'No' || current === 'Yes')
    && validGenericTextfield(currentExplanation)
}

const validateHasMultiple = hasMultiple => !!hasMultiple
  && (hasMultiple === 'Yes' || hasMultiple === 'No')

const validateMinimumCitizenships = (citizenships) => {
  if (citizenships.items && citizenships.items.length < 2) {
    return false
  }

  return true
}

/** Object Validators (as functions) */
export const validateCitizenshipItem = (data = {}) => {
  const country = data.Country
  const dates = data.Dates
  const how = data.How
  const renounced = (data.Renounced || {}).value
  const renouncedExplanation = data.RenouncedExplanation
  const current = (data.Current || {}).value
  const currentExplanation = data.CurrentExplanation

  const validCountry = validateCountry(country)
  const validDates = validateDates(dates)
  const validCurrent = validateCurrent(dates, current, currentExplanation)

  if (!isUnitedStates(country)) {
    const validHow = validateHow(how)
    const validRenounced = validateRenounced(renounced, renouncedExplanation)

    return validCountry && validDates && validCurrent && validHow && validRenounced
  }

  return validCountry && validDates && validCurrent
}

const validateCitizenships = citizenships => (
  validAccordion(citizenships, i => validateCitizenshipItem(i))
)

export const validateCitizenshipMultiple = (data = {}) => {
  const hasMultiple = (data.HasMultiple || {}).value
  const citizenships = data.List || {}

  const validHasMultiple = validateHasMultiple(hasMultiple)

  if (hasMultiple === 'Yes') {
    const validMinimumCitizenships = validateMinimumCitizenships(citizenships)
    const validCitizenships = validateCitizenships(citizenships)

    return validHasMultiple && validMinimumCitizenships && validCitizenships
  }

  return validHasMultiple
}

/** Object Validators (as classes) - legacy */
export default class CitizenshipMultipleValidator {
  constructor(data = {}) {
    this.data = data
    this.hasMultiple = (data.HasMultiple || {}).value
    this.list = data.List || {}
  }

  validHasMultiple() {
    return validateHasMultiple(this.hasMultiple)
  }

  validMinimumCitizenships() {
    if (this.hasMultiple !== 'Yes') {
      return true
    }

    return validateMinimumCitizenships(this.list)
  }

  validCitizenships() {
    if (this.hasMultiple !== 'Yes') {
      return true
    }

    return validateCitizenships(this.list)
  }

  isValid() {
    return validateCitizenshipMultiple(this.data)
  }
}

export class CitizenshipItemValidator {
  constructor(data = {}) {
    this.data = data
    this.country = data.Country
    this.dates = data.Dates
    this.how = data.How
    this.renounced = (data.Renounced || {}).value
    this.renouncedExplanation = data.RenouncedExplanation
    this.current = (data.Current || {}).value
    this.currentExplanation = data.CurrentExplanation
  }

  isUnitedStates() {
    return isUnitedStates(this.country)
  }

  validCountry() {
    return validateCountry(this.country)
  }

  validDates() {
    return validateDates(this.dates)
  }

  validHow() {
    if (this.isUnitedStates()) {
      return true
    }

    return validateHow(this.how)
  }

  validRenounced() {
    if (this.isUnitedStates()) {
      return true
    }

    return validateRenounced(this.renounced, this.renouncedExplanation)
  }

  validCurrent() {
    return validateCurrent(this.dates, this.current, this.currentExplanation)
  }

  isValid() {
    return validateCitizenshipItem(this.data)
  }
}
