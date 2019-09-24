/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import {
  daysAgo,
  today,
  extractDate,
  validDate,
} from '../components/Section/History/dateranges'

export const validGenericTextfield = (obj) => {
  if (!obj || !obj.value) {
    return false
  }
  return true
}

/**
 * Validates a phone number
 */
export const validPhoneNumber = (phone, opts = { numberType: false }) => {
  if (!phone) {
    return false
  }
  if (phone.noNumber) {
    return true
  }
  if (!phone.numberType && opts.numberType) {
    return false
  }
  if (!phone.timeOfDay) {
    return false
  }
  if (!phone.number) {
    return false
  }

  const trimmed = parseInt(phone.number, 10) !== 0
    ? `${parseInt(phone.number, 10)}`
    : phone.number.trim()
  switch (phone.type) {
    case 'Domestic':
      return trimmed.length === 10
    case 'International':
      return trimmed.length > 10
    default:
      return false
  }
}

/**
 * Validates a date
 */
export const validDateField = (obj = {}) => validDate(obj)

export const withinSevenYears = (from, to) => {
  const sevenYearsAgo = daysAgo(today, 365 * 7)
  const fromDate = extractDate(from)
  const toDate = extractDate(to)

  if (
    (fromDate && fromDate >= sevenYearsAgo)
    || (toDate && toDate >= sevenYearsAgo)
  ) {
    return true
  }
  return false
}

/**
 * Checks if a branch value is within the set of possible valid yes/no values.
 */
export const validBranch = (value, yesValue = 'Yes', noValue = 'No') => (
  value === yesValue || value === noValue
)

export const battery = (tests, validator, fn) => (
  tests.forEach((test) => {
    // This allows us to pass whatever test parameters in to the validation
    // function as we see fit just as long as the match the order in the
    // function signature
    const props = []
    for (const p in test) {
      props.push(test[p])
    }

    // eslint-disable-next-line new-cap
    expect(new validator(...props)[fn]()).toBe(test.expected)
  })
)

export const validSSN = (ssn) => {
  if (ssn.notApplicable === true) {
    return true
  }

  // Legacy system only excluded explicit values
  const fullSSN = `${ssn.first}-${ssn.middle}-${ssn.last}`
  const legacyInvalid = ['999-99-9999', '123-45-6789']
  if (legacyInvalid.some(x => x === fullSSN)) {
    return false
  }

  return (
    !!ssn.first
    && !!ssn.middle
    && !!ssn.last
    && ssn.first.length === 3
    && ssn.middle.length === 2
    && ssn.last.length === 4
  )
}

export const nameIsEmpty = (name) => {
  switch (true) {
    case !name:
    case !name.first && !name.middle && !name.last:
      return true
    default:
      return false
  }
}

export const pickDate = (dates, max = true) => {
  const buildsDates = dates.map(extractDate)

  const findMinDate = (finalDate, dateItem) => {
    if (finalDate <= dateItem) {
      return finalDate
    }
    return dateItem
  }

  const findMaxDate = (finalDate, dateItem) => {
    if (finalDate >= dateItem) {
      return finalDate
    }
    return dateItem
  }

  if (max) {
    return buildsDates.reduce(findMaxDate)
  }

  return buildsDates.reduce(findMinDate)
}

export const alphaNumericRegEx = '^[a-zA-Z0-9]*$'
