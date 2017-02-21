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
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))

  // Shift back
  value = value.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
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
  if (a.from < b.from) {
    return -1
  }

  if (a.from > b.from) {
    return 1
  }

  return 0
}

/**
 * Calculate a date in the past
 */
export const daysAgo = (from, days) => {
  return new Date(from - (1000 * 60 * 60 * 24 * days))
}

/**
 * Convert date to UTC
 */
export const utc = (date) => {
  if (!date) {
    return null
  }

  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
}

/**
 * Get the Julian date
 */
export const julian = (date) => {
  if (!date) {
    return null
  }
  return (((+utc(date)) / 86400000) + 2440587.5).toFixed(6)
}

/**
 * Convert a Julian date to a normal date
 */
export const fromJulian = (julian) => {
  return new Date((Number(julian) - 2440587.5) * 86400000)
}

/**
 * Find the percentage/position within a date range a particular value has.
 */
export const findPercentage = (max, min, value) => {
  const pos = ((value - min) / (max - min)) * 100
  return decimalAdjust('round', pos, -2)
}

/**
 * Determine how many days are between dates
 */
export const daysBetween = (from, to) => {
  const diff = Math.abs(to.getTime() - from.getTime())
  return Math.ceil(diff / (1000 * 3600 * 24))
}

/**
 * Find the gaps in the timeline
 */
export const gaps = (ranges = [], start = ten, buffer = 30) => {
  let holes = []
  const fullStop = today

  const length = ranges.length - 1
  ranges.sort(rangeSorter).forEach((range, i) => {
    // Finds the gaps from the past to the present
    const stop = range.from
    if (stop > start && daysBetween(start, stop) > buffer) {
      holes.push({
        from: start,
        to: range.from
      })
    }

    // Set the next start position
    start = range.to

    // If this is the last date range check for gaps in the future
    if (i === length && start < fullStop && daysBetween(start, fullStop) > buffer) {
      holes.push({
        from: start,
        to: fullStop
      })
    }
  })

  return holes
}

/**
 * Common dates used in calculations
 */
export const now = new Date(new Date().toUTCString())
export const today = utc(now)
export const ten = daysAgo(today, 365 * 10)
export const julianNow = julian(today)
export const julianTen = julian(ten)
