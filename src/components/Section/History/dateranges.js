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
  if (a.from.date < b.from.date) {
    return -1
  }

  if (a.from.date > b.from.date) {
    return 1
  }

  return 0
}

export const rangeSorter2 = (a, b) => {
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
  if (!from || !to) {
    return 0
  }

  const diff = Math.abs(to.getTime() - from.getTime())
  return Math.ceil(diff / (1000 * 3600 * 24))
}

/**
 * Determine if a specified year is considered a leap year
 */
export const leapYear = (year) => {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

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
  let upperBounds = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (y > 0 && leapYear(y)) {
    upperBounds[1] = 29
  }

  return Math.min(max, upperBounds[m - 1])
}

/**
 * Determine if a date is valid with leap years considered
 */
export const validDate = (month, day, year) => {
  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    return false
  }
  const m = parseInt(month || 0)
  const d = parseInt(day || 0)
  const y = parseInt(year || 0)

  return (y > 1000 && y < 10000) && (m > 0 && m < 13) && (d > 0 && d <= daysInMonth(m, y))
}

export const endOfMonth = (date) => {
  if (!date) {
    return null
  }

  let proposed = new Date(date)
  proposed.setDate(daysInMonth(proposed.getMonth() + 1, proposed.getFullYear()))
  return proposed
}

/**
 * Find the gaps in the timeline
 */
export const gaps = (ranges = [], start = ten, buffer = 30) => {
  let holes = []
  const fullStop = today
  const length = ranges.length - 1

  // Set the day to the last of the month
  start = endOfMonth(start)

  ranges.sort(rangeSorter).forEach((range, i) => {
    if (!range.from || !range.to) {
      return
    }

    // Finds the gaps from the past to the present
    const stop = new Date(range.from.date)
    if (stop > start && daysBetween(start, stop) > buffer) {
      holes.push({
        from: {
          date: start
        },
        to: {
          date: range.from.date
        }
      })
    }

    // Set the next start position
    start = endOfMonth(range.to.date)

    // If this is the last date range check for gaps in the future
    if (i === length && start < fullStop && daysBetween(start, fullStop) > buffer) {
      holes.push({
        from: {
          date: range.to.date
        },
        to: {
          date: fullStop
        }
      })
    }
  })

  return holes
}

export const gaps2 = (ranges = [], start = ten, buffer = 30) => {
  // Start off with a gap covering the entire span of available dates
  let gaps = [{ from: start, to: today }]

  for (const range of ranges.sort(rangeSorter2)) {
    for (let i = gaps.length - 1; i > -1; i--) {
      const gap = gaps[i]

      if (range.from <= gap.from && range.to >= gap.to) {
        // The range cover the gap so we must remove it
        gaps.splice(i, 1)
        continue
      }

      if (range.from > gap.from) {
        // This is effectively inside of the gap based on the `from`

        if (range.to <= gap.to) {
          // We are completely inside of the gap.
          // This means we now have to split the gap in to two parts
          gaps.push({ from: range.to, to: gap.to })
          gaps[i].to = range.from
        } else {
          // We now have to shrink the gap
          gaps[i].to = range.from
        }
      }

      if (range.to < gap.to) {
        // This is inside the gap based on the `to`

        if (range.from >= gap.from) {
          // We are completely inside of the gap.
          // This means we now have to split the gap in to two parts
          gaps[i].from = range.to
          gaps.push({ from: range.to, to: gap.to })
        } else {
          // We now have to shrink the gap
          gaps[i].from = range.to
        }
      }
    }
  }

  return gaps.filter(gap => daysBetween(gap.from, gap.to) > buffer)
}

/**
 * Common dates used in calculations
 */
export const now = new Date(new Date().toUTCString())
export const today = utc(now)
export const ten = daysAgo(today, 365 * 10)
export const julianNow = julian(today)
export const julianTen = julian(ten)
