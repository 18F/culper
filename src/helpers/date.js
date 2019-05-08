/* eslint import/prefer-default-export: 0 */
import { DateTime, Duration } from 'luxon'
import { validate } from 'validate.js'

export const today = DateTime.local()

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

export const dateWithinRange = (date, range) => {
  const duration = Duration.fromObject(range)
  const boundary = today.minus(duration)

  return boundary <= createDateFromObject(date)
}
