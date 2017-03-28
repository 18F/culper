import { daysAgo, today } from '../components/Section/History/dateranges'

export const validGenericMonthYear = (obj) => {
  if (!obj || !obj.month || !obj.year) {
    return false
  }
  return true
}

export const validGenericTextfield = (obj) => {
  if (!obj || !obj.value) {
    return false
  }
  return true
}

/**
 * Checks if a status exists in a set of completed fields
 */
export const hasStatus = (completed) => (property, status, val) => {
  return (completed[property] && completed[property].status === val) ||
    (status && status[property] && status[property].status === val)
}

/**
 * Checks if a status exists for all properties for a given value
 */
export const allHaveStatus = (completed) => (properties, status, val) => {
  for (let property of properties) {
    if (!hasStatus(completed)(property, status, val)) {
      return false
    }
  }
  return true
}

/**
 * Checks if any status contains the specified value for all properties
 */
export const anyHasStatus = (completed) => (properties, status, val) => {
  for (let property of properties) {
    if (hasStatus(completed)(property, status, val)) {
      return true
    }
  }
  return false
}

/**
 * Validates a phone number
 */
export const validPhoneNumber = (phone) => {
  if (!phone) {
    return false
  }
  if (phone.noNumber === 'NA') {
    return true
  }
  if (!phone.number) {
    return false
  }
  if (!phone.numberType) {
    return false
  }
  if (!phone.timeOfDay) {
    return false
  }

  return true
}

/**
 * Validates a date
 */
export const validDateField = (obj) => {
  if (!obj) {
    return false
  }
  if (!obj.day) {
    return false
  }
  if (!obj.month) {
    return false
  }
  if (!obj.year) {
    return false
  }
  return true
}

export const withinSevenYears = (from, to) => {
  const sevenYearsAgo = daysAgo(today, 365 * 7)
  if ((from && from.date && from.date >= sevenYearsAgo) || (to && to.date && to.date >= sevenYearsAgo)) {
    return true
  }
  return false
}
