/* eslint import/prefer-default-export: 0 */
import { DateTime } from 'luxon'

export const isDateTime = (obj = {}) => DateTime.isDateTime(obj)

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
