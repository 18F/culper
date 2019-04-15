import store from 'services/store'

import * as formTypes from 'constants/formTypes'
import { requireMultipleCitizenshipRenounced } from 'helpers/branches'

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
export const validateCitizenshipItem = (data = {}, formType = formTypes.SF86) => {
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

    const validRenounced = requireMultipleCitizenshipRenounced(formType)
      ? validateRenounced(renounced, renouncedExplanation)
      : true

    return validCountry && validDates && validCurrent && validHow && validRenounced
  }

  return validCountry && validDates && validCurrent
}

const validateCitizenships = (citizenships, formType) => (
  validAccordion(citizenships, i => validateCitizenshipItem(i, formType))
)

export const validateCitizenshipMultiple = (data = {}, formType = formTypes.SF86) => {
  const hasMultiple = (data.HasMultiple || {}).value
  const citizenships = data.List || {}

  const validHasMultiple = validateHasMultiple(hasMultiple)

  if (hasMultiple === 'Yes') {
    const validMinimumCitizenships = validateMinimumCitizenships(citizenships)
    const validCitizenships = validateCitizenships(citizenships, formType)

    return validHasMultiple && validMinimumCitizenships && validCitizenships
  }

  return validHasMultiple
}

/** Object Validators (as classes) - legacy */
export default class CitizenshipMultipleValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings

    this.data = data
    this.formType = formType

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

    return validateCitizenships(this.list, this.formType)
  }

  isValid() {
    return validateCitizenshipMultiple(this.data, this.formType)
  }
}

export class CitizenshipItemValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings

    this.data = data
    this.formType = formType

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
    return validateCitizenshipItem(this.data, this.formType)
  }
}
