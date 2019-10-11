import {
  today,
  daysAgo,
  daysBetween,
  extractDate,
} from 'components/Section/History/dateranges'

/**
 * Figure the total amount of years to collect for the timeline
 */
export const totalYears = (birthdate, years = 10) => {
  let total = years
  if (!birthdate) {
    return total
  }

  const eighteen = daysAgo(birthdate, 365 * -18)
  total = Math.ceil(daysBetween(eighteen, today) / 365)

  // Maximum years required
  if (total > years) {
    total = years
  }

  // A minimum of two years is required
  if (total < 2) {
    total = 2
  }

  return total
}

/**
 * Default sorting of history objects. This assumes that all objects contain a `Dates` property
 * with date range values.
 */
export const sort = (a, b) => {
  // Helper to find the date value or default it to 0
  const getOptionalDate = obj => (((obj || {}).Item || {}).Dates || {}).to

  const first = extractDate(getOptionalDate(a)) || 0
  const second = extractDate(getOptionalDate(b)) || 0

  if (a.type === 'Gap') {
    return 1
  }

  if (b.type === 'Gap') {
    return -1
  }

  if (first < second) {
    return 1
  }

  if (first > second) {
    return -1
  }

  return 0
}
