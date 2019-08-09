/* eslint import/prefer-default-export: 0 */
import { DateTime, Duration } from 'luxon'
import { validate } from 'validate.js'

export const today = DateTime.local()

export const isDateTime = (obj = {}) => DateTime.isDateTime(obj)

export const cleanDateObject = (obj) => {
  // Return param if it's not a plain object (it will be invalid)
  if (!validate.isHash(obj)) return obj

  // Allowed object keys (per luxon spec)
  const {
    year, month, day, ordinal, weekYear, weekNumber, weekday, hour, minute,
    second, millisecond, zone, locale, outputCalendar, numberingSystem,
  } = obj

  return {
    year,
    month,
    day,
    ordinal,
    weekYear,
    weekNumber,
    weekday,
    hour,
    minute,
    second,
    millisecond,
    zone,
    locale,
    outputCalendar,
    numberingSystem,
  }
}

export const createDateFromObject = (data) => {
  try {
    return DateTime.fromObject(data)
  } catch (e) {
    return NaN
  }
}

export const createDateFromTimestamp = (ts) => {
  try {
    return DateTime.fromMillis(ts)
  } catch (e) {
    return NaN
  }
}

export const createDurationFromObject = (data) => {
  try {
    return Duration.fromObject(data)
  } catch (e) {
    return NaN
  }
}

export const dateWithinRange = (date, range) => {
  const duration = Duration.fromObject(range)
  const boundary = today.minus(duration)

  return boundary <= createDateFromObject(cleanDateObject(date))
}

/** Convert date objects to luxon objects and sort by from date */
export const sortDateRanges = (ranges) => {
  const sortFn = (a, b) => {
    if (a.from < b.from) return -1
    if (a.from > b.from) return 1
    return 0
  }

  return [...ranges].map(r => ({
    from: createDateFromObject(cleanDateObject(r.from)),
    to: r.present ? today : createDateFromObject(cleanDateObject(r.to)),
  }))
    .sort(sortFn)
}

/**
 * All dates being operated on are luxon date objects
 * @param {*} coverage - duration object that needs to be covered
 * @param {*} ranges - ranges to check against coverage duration
 */
export const findTimelineGaps = (coverage, ranges) => {
  const coverageDuration = Duration.fromObject(coverage)
  const requiredRange = {
    from: today.minus(coverageDuration),
    to: today,
  }

  const minimumGap = 1 // in days

  // prepare & sort ranges
  const sortedRanges = sortDateRanges(ranges)

  // the return value
  const gaps = []
  let rangesOverlap = false

  // Point on the timeline we are comparing against (this will change)
  let rightBoundary = requiredRange.from

  sortedRanges.forEach((range) => {
    const { from, to } = range
    if (from <= rightBoundary && to < rightBoundary) {
      // range outside boundary, no op
    } else if (from <= rightBoundary) {
      // range contains boundary; no gap. update right boundary
      rightBoundary = to
      rangesOverlap = true
    } else {
      // range does not contain boundary, we have a gap
      const gapDuration = from.diff(rightBoundary, 'days')

      // don't include gaps that are less than 24 hours
      if (gapDuration.as('days') > minimumGap) {
        const gap = { from: rightBoundary, to: from }
        gaps.push(gap)
      }

      rightBoundary = to
      rangesOverlap = true
    }
  })

  if (!rangesOverlap) {
    gaps.push(requiredRange)
  }

  return gaps
}
