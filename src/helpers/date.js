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

export const sortDateObjects = (dates = []) => {
  const sortFn = (a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  return dates.filter(d => !!d)
    .map(d => createDateFromObject(cleanDateObject(d)))
    .sort(sortFn)
}

// get applicant age (today - birthdate) in years
// if # of years - 18 >= required years, return required years
// if # of years - 18 < required years, > 2, return difference
// return 2
export const getApplicantRequiredDuration = (requiredDuration = { years: 2 }, birthdate) => {
  const duration = Duration.fromObject(requiredDuration)
  if (!duration.isValid) return 2

  const durationYears = duration.as('years')
  if (!birthdate) return durationYears

  const birthdateDate = createDateFromObject(cleanDateObject(birthdate))
  if (!birthdateDate.isValid) return durationYears

  const applicantAge = today.diff(birthdateDate).as('years')
  const thresholdAge = 18
  const minimumYears = 2

  const applicableYears = applicantAge - thresholdAge
  if (applicableYears >= durationYears) return durationYears
  if (applicableYears >= minimumYears) return Math.floor(applicableYears)
  return minimumYears
}

/** Convert date objects to luxon objects and sort by from date */
export const sortDateRanges = (ranges) => {
  const sortFn = (a, b) => {
    if (a.from < b.from) return -1
    if (a.from > b.from) return 1
    return 0
  }

  return ranges.sort(sortFn)
}

export const validateDateRanges = ranges => (
  [...ranges].map(r => ({
    from: createDateFromObject(cleanDateObject(r.from)),
    to: r.present ? today : createDateFromObject(cleanDateObject(r.to)),
  })).filter(r => r.from.isValid && r.to.isValid)
)

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

  const minimumGap = 30 // in days

  // prepare & sort ranges
  const sortedRanges = sortDateRanges(validateDateRanges(ranges))

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

      // don't include gaps that are less than the minimum # of days
      if (gapDuration.as('days') > minimumGap) {
        const gap = { from: rightBoundary.toObject(), to: from.toObject() }
        gaps.push(gap)
      }

      rightBoundary = to
      rangesOverlap = true
    }
  })

  if (rangesOverlap && rightBoundary < requiredRange.to) {
    gaps.push({
      from: rightBoundary.toObject(),
      to: requiredRange.to.toObject(),
    })
  }

  if (!rangesOverlap) {
    gaps.push({
      from: requiredRange.from.toObject(),
      to: requiredRange.to.toObject(),
    })
  }

  return gaps
}
