import { daysAgo, today } from '../components/Section/History/dateranges'

export const validGenericMonthYear = obj => {
  if (!obj || !obj.month || !obj.year) {
    return false
  }
  return true
}

export const validGenericTextfield = obj => {
  if (!obj || !obj.value) {
    return false
  }
  return true
}

export const validCurrency = obj => {
  if (!obj || !obj.value || isNaN(obj.value)) {
    return false
  }
  return true
}

/**
 * Checks if a status exists in a set of completed fields
 */
export const hasStatus = completed => (property, status, val) => {
  return (
    (completed[property] && completed[property].status === val) ||
    (status && status[property] && status[property].status === val)
  )
}

/**
 * Checks if a status exists for all properties for a given value
 */
export const allHaveStatus = completed => (properties, status, val) => {
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
export const anyHasStatus = completed => (properties, status, val) => {
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
export const validPhoneNumber = phone => {
  if (!phone) {
    return false
  }
  if (phone.noNumber) {
    return true
  }
  if (!phone.numberType) {
    return false
  }
  if (!phone.timeOfDay) {
    return false
  }
  if (!phone.number) {
    return false
  }

  const trimmed = `${parseInt(phone.number, 10)}`
  switch (phone.type) {
    case 'Domestic':
      return trimmed.length === 10
    case 'DSN':
      return trimmed.length === 7
    case 'International':
      return trimmed.length > 10
    default:
      return false
  }
}

/**
 * Validates a date
 */
export const validDateField = (obj = {}) => {
  if (!obj) {
    return false
  }
  if (obj.value && !isNaN(obj.value)) {
    return true
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
  const fromDate = buildDate(from)
  const toDate = buildDate(to)

  if (
    (fromDate && fromDate >= sevenYearsAgo) ||
    (toDate && toDate >= sevenYearsAgo)
  ) {
    return true
  }
  return false
}

export const validAccordion = (collection, valid, ignoreBranch = false) => {
  const branch = ignoreBranch
    ? { value: 'No' }
    : (collection || {}).branch || {}
  const items = (collection || {}).items || []
  if (branch.value !== 'No') {
    return false
  }

  if (items.length === 0) {
    return false
  }

  return items.every(x => {
    return valid(x.Item || {})
  })
}

/**
 * Helper for testing components using the branch collection
 */
export class BranchCollection {
  constructor(collection = [], key = 'Has') {
    this.collection = collection
    this.key = key
  }

  /**
   * Returns if the collection is empty
   */
  empty() {
    if (
      !this.collection ||
      !this.collection.items ||
      !this.collection.items.length
    ) {
      return true
    }
    return false
  }

  /**
   * Ensures that the collection is not empty and that valid Yes/No responses were included.
   * Since users are required to mark an answer, an empty collection does not mean it's valid. It must have
   * at least one Yes/No item
   */
  validKeyValues() {
    return !this.empty() && (this.hasNo() || this.hasYes())
  }

  /**
   * Checks if an item has been marked with No
   */
  hasNo() {
    return this.hasKeyValue('No')
  }

  /**
   * Checks if an item has been marked with Yes
   */
  hasYes() {
    return this.hasKeyValue('Yes')
  }

  /**
   * Iterator that goes through each item and executes the isValidFunc. When an item
   * is invalid, it returns.
   * @param isValidFunc - Function that is excuted and returns whether the item is valid. This
   * is meant to be passed in by callers of this method.
   */
  each(isValidFunc) {
    if (this.empty()) {
      return false
    }

    for (let item of (this.collection || {}).items) {
      const key = (item.Item || {})[this.key] || {}
      if (key.value === 'No') {
        continue
      }
      if (!isValidFunc(item.Item || {})) {
        return false
      }
    }
    return true
  }

  /**
   * Helper function that checks if a given key exists at the root level of a branch collection item
   */
  hasKeyValue(value) {
    if (this.empty()) {
      return false
    }
    for (let item of (this.collection || {}).items) {
      const key = (item.Item || {})[this.key] || {}
      if (key.value === value) {
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
  return value === yesValue || value === noValue
}

export const battery = (tests, validator, fn) => {
  return tests.forEach((test, index) => {
    // This allows us to pass whatever test parameters in to the validation
    // function as we see fit just as long as the match the order in the
    // function signature
    let props = []
    for (let p in test) {
      props.push(test[p])
    }

    // eslint-disable-next-line new-cap
    expect(new validator(...props)[fn]()).toBe(test.expected)
  })
}

export const validSSN = ssn => {
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
    !!ssn.first &&
    !!ssn.middle &&
    !!ssn.last &&
    ssn.first.length === 3 &&
    ssn.middle.length === 2 &&
    ssn.last.length === 4
  )
}

export const nameIsEmpty = name => {
  switch (true) {
    case !name:
    case !name.first && !name.middle && !name.last:
      return true
    default:
      return false
  }
}
export const buildDate = date => {
  if (!date) {
    return null
  }
  let year = date.year
  let month = date.month
  let day = date.day
  if (year && year.length > 3 && month && day) {
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  } else {
    return null
  }
}
