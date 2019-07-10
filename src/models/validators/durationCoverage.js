import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import { findTimelineGaps } from 'helpers/date'

const durationCoverageValidator = (value, options, key, attributes, globalOptions) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { requiredDuration } = options
  if (!requiredDuration) return 'Invalid options'

  // Extract valid date ranges
  const { items } = value
  const ranges = items
    .filter(i => i.Item && i.Item.Dates && validateModel(
      { Dates: i.Item.Dates },
      { Dates: { presence: true, daterange: true } },
      { ...globalOptions, ...options }
    ) === true)
    .map(i => i.Item.Dates)

  const gaps = findTimelineGaps(requiredDuration, ranges)
  if (gaps.length > 0) return 'Gaps present'

  return null
}

export default durationCoverageValidator
