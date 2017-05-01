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

export const validNotApplicable = (notApplicable, logic, notLogic) => {
  // If the `NotApplicable` object is not present then apply the logic
  if (!notApplicable) {
    return logic()
  }

  // If the `NotApplicable` object is present and is applicable then apply the logic
  if (notApplicable && notApplicable.applicable) {
    return logic()
  } else if (notLogic) {
    return notLogic()
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

/**
 * Helper for testing components using the branch collection
 */
export class BranchCollection {
  constructor (collection = [], key = 'Has') {
    this.collection = collection
    this.key = key
  }

  /**
   * Returns if the collection is empty
   */
  empty () {
    if (!this.collection || !this.collection.length) {
      return true
    }
    return false
  }

  /**
   * Ensures that the collection is not empty and that valid Yes/No responses were included.
   * Since users are required to mark an answer, an empty collection does not mean it's valid. It must have
   * at least one Yes/No item
   */
  validKeyValues () {
    return !this.empty() && (this.hasNo() || this.hasYes())
  }

  /**
   * Checks if an item has been marked with No
   */
  hasNo () {
    return this.hasKeyValue('No')
  }

  /**
   * Checks if an item has been marked with Yes
   */
  hasYes () {
    return this.hasKeyValue('Yes')
  }

  /**
   * Iterator that goes through each item and executes the isValidFunc. When an item
   * is invalid, it returns.
   * @param isValidFunc - Function that is excuted and returns whether the item is valid. This
   * is meant to be passed in by callers of this method.
   */
  each (isValidFunc) {
    if (this.empty()) {
      return false
    }

    for (let item of this.collection) {
      if (!isValidFunc(item)) {
        return false
      }
    }
    return true
  }

  /**
   * Helper function that checks if a given key exists at the root level of a branch collection item
   */
  hasKeyValue (key) {
    if (this.empty()) {
      return false
    }
    for (let item of this.collection) {
      if (item[this.key] === key) {
        return true
      }
    }
    return false
  }
}

/**
 * Checks if a branch value is within the set of possible valid yes/no values.
 */
export const validBranch = (value, yesValue = 'Yes', noValue = 'No') => {
  return (value === yesValue || value === noValue)
}

export const battery = (tests, validator, fn) => {
  return tests.forEach((test, index) => {
    expect(new validator(test.state, null)[fn]()).toBe(test.expected)
  })
}

export const validSSN = (ssn) => {
  if (ssn.notApplicable === true) {
    return true
  }
  return !!ssn.first && !!ssn.middle && !!ssn.last
}
