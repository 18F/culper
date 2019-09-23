/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable prefer-template */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */

/**
 * TODO:
 * most if not all of the functions in this file should be refactored to use the
 * luxon datetime library. current homegrown date handling functions are buggy
 * and not accurate.
 */

/**
 * Take one of the many schemas of a date and always output a valid
 * Date object or null.
 */
export const extractDate = (dateObj) => {
  if (dateObj instanceof Date) {
    return dateObj
  }

  if (!dateObj || !dateObj.month || !dateObj.day || !dateObj.year) {
    return null
  }
  var d = new Date(`${dateObj.month}/${dateObj.day}/${dateObj.year}`)
  d.setFullYear(dateObj.year) // addresses an issue where two digit years are assumed to be in 20th or 21st centry, ex: 99 -> 1999 01 -> 2001

  return d
}

/**
 * Do some fancy decimal rounding allowing for different types:
 *  - round
 *  - floor
 *  - ceil
 *
 * This was pulled from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
 */
export const decimalAdjust = (type, value, exp) => {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value)
  }

  value = +value
  exp = +exp

  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN
  }

  // Shift
  value = value.toString().split('e')
  value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)))

  // Shift back
  value = value.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp))
}

/**
 * Sort an array of date ranges which have the structure
 *
 *   {
 *     to: [date],
 *     from: [date]
 *   }
 */
export const rangeSorter = (a, b) => {
  const af = extractDate(a.from)
  const bf = extractDate(b.from)

  if (af < bf) {
    return -1
  }

  if (af > bf) {
    return 1
  }

  return 0
}

/**
 * Calculate a date in the past
 */
export const daysAgo = (from, days) => (
  new Date(from - 1000 * 60 * 60 * 24 * days)
)

/**
 * Convert date to UTC
 */
export const utc = (date) => {
  if (!date) {
    return null
  }
  if (Object.prototype.toString.call(date) === '[object String]') {
    return null
  }

  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
}

export const now = new Date(new Date().toUTCString())
export const today = utc(now)
export const ten = daysAgo(today, 365 * 10)

/**
 * Get the Julian date
 */
export const julian = (date) => {
  if (!date) {
    return null
  }
  return (+utc(date) / 86400000 + 2440587.5).toFixed(6)
}

/**
 * Find the percentage/position within a date range a particular value has.
 */
export const findPercentage = (max, min, value) => {
  let largest = max
  let smallest = min
  if (min > largest) {
    largest = min
    smallest = max
  }

  const pos = ((value - smallest) / (largest - smallest)) * 100
  if (pos < 0) {
    return 0
  }
  if (pos > 100) {
    return 100
  }

  return decimalAdjust('round', pos, -2)
}

/**
 * Determine how many days are between dates
 */
export const daysBetween = (from, to) => {
  if (!from || !to) {
    return 0
  }

  const diff = Math.abs(to.getTime() - from.getTime())
  return Math.ceil(diff / (1000 * 3600 * 24))
}

/**
 * Determine if a specified year is considered a leap year
 */
export const leapYear = year => (
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
)

/**
 * Returns how many days are in a month based on the given year
 */
export const daysInMonth = (month, year) => {
  const max = 31
  const m = parseInt(month || 1) || 1
  const y = parseInt(year || 0) || 0

  // Bound check on the month
  if (m < 1 || m > 12) {
    return max
  }

  // Setup for upperbounds of days in months
  const upperBounds = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (y > 0 && leapYear(y)) {
    upperBounds[1] = 29
  }

  return Math.min(max, upperBounds[m - 1])
}

/**
 * Determine if a date is valid with leap years considered
 */
export const validDate = (date) => {
  if (!date) {
    return false
  }

  const { month, day, year } = date

  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    return false
  }
  const m = parseInt(month || 0)
  const d = parseInt(day || 0)
  const y = parseInt(year || -1)

  return (
    y >= 0
    && y < 10000
    && (m > 0 && m < 13)
    && (d > 0 && d <= daysInMonth(m, y))
  )
}

/**
 * Find the gaps in the timeline
 */
export const gaps = (ranges = [], start = ten, buffer = 30) => {
  // If any of the ranges covers the entire timeline then return no gaps
  for (const range of ranges) {
    if (
      daysAgo(range.from, -1 * buffer) <= start
      && range.to >= daysAgo(today, buffer)
    ) {
      return []
    }
  }

  const holes = []
  const fullStop = today
  const length = ranges.length - 1

  ranges.sort(rangeSorter).forEach((range, i) => {
    if (!range.from || !range.to) {
      return
    }

    // Finds the gaps from the past to the present
    const stop = range.from
    if (stop > start && daysBetween(start, stop) > buffer) {
      holes.push({ from: start, to: range.from })
    }

    // Set the next start position
    start = range.to

    // If this is the last date range check for gaps in the future
    if (
      i === length
      && start < fullStop
      && daysBetween(start, fullStop) > buffer
    ) {
      holes.push({ from: range.to, to: fullStop })
    }
  })

  return holes
}

/**
 * Common dates used in calculations
 */
export const julianNow = julian(today)
