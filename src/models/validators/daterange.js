import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import {
  today, cleanDateObject, createDateFromObject, createDurationFromObject,
} from 'helpers/date'
import { INVALID_DATE_RANGE } from 'constants/errors'

const dateRangeValidator = (value = {}, options, key, attributes, globalOptions) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { from, present } = value
  const to = present
    ? today.toObject()
    : value.to

  const dateErrors = validateModel({ from, to }, {
    from: { presence: true, date: true },
    to: { presence: true, date: true },
  }, { ...globalOptions, ...options })

  if (dateErrors !== true) return dateErrors

  const fromDateObj = createDateFromObject(cleanDateObject(from))
  const toDateObj = createDateFromObject(cleanDateObject(to))
  if (toDateObj >= fromDateObj) {
    const { minDuration, maxDuration } = options
    if (minDuration || maxDuration) {
      // validate the diff
      const durationUnit = 'days'
      const rangeDiff = toDateObj.diff(fromDateObj, durationUnit).as(durationUnit)
      if (minDuration
        && (createDurationFromObject(minDuration).as(durationUnit) > rangeDiff)) {
        return 'Range is shorter than minimum duration'
      }

      if (maxDuration
        && (createDurationFromObject(maxDuration).as(durationUnit) < rangeDiff)) {
        return 'Range exceeds maximum duration'
      }
    }

    return null
  }

  return INVALID_DATE_RANGE
}

export default dateRangeValidator
