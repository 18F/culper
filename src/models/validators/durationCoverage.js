import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import { findTimelineGaps } from 'helpers/date'
import { INVALID_DURATION, INCOMPLETE_DURATION } from 'constants/errors'

const durationCoverageValidator = (value, options = {}) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { requiredDuration } = options
  if (!requiredDuration) return INVALID_DURATION

  // Extract valid date ranges
  const { items } = value
  const ranges = items
    .filter(i => i.Item && i.Item.Dates && validateModel(
      { Dates: i.Item.Dates },
      { Dates: { presence: true, daterange: true } }
    ) === true)
    .map(i => i.Item.Dates)

  const gaps = findTimelineGaps(requiredDuration, ranges)
  if (gaps.length > 0) return INCOMPLETE_DURATION

  return null
}

export default durationCoverageValidator
