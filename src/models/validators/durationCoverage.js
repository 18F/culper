/* eslint-disable import/no-cycle */
import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import { findTimelineGaps } from 'helpers/date'
import { INVALID_DURATION, INCOMPLETE_DURATION, MISSING_ITEMS } from 'constants/errors'

const durationCoverageValidator = (value, options, key, attributes, globalOptions) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { requiredDuration } = options
  if (!requiredDuration) return INVALID_DURATION

  // Extract valid date ranges
  const { items } = value

  if (!items || !items.length) return MISSING_ITEMS

  const ranges = items
    .filter(i => i.Item && i.Item.Dates && validateModel(
      { Dates: i.Item.Dates },
      { Dates: { presence: true, daterange: true } },
      { ...globalOptions, ...options }
    ) === true)
    .map(i => i.Item.Dates)

  const gaps = findTimelineGaps(requiredDuration, ranges)
  if (gaps.length > 0) return INCOMPLETE_DURATION

  return null
}

export default durationCoverageValidator
