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
