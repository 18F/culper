import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import { today, cleanDateObject, createDateFromObject } from 'helpers/date'
import { INVALID_DATE_RANGE } from 'constants/errors'

const dateRangeValidator = (value = {}) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { from, present } = value
  const to = present
    ? today.toObject()
    : value.to

  const dateErrors = validateModel({ from, to }, {
    from: { presence: true, date: true },
    to: { presence: true, date: true },
  })

  if (dateErrors !== true) return dateErrors

  if (createDateFromObject(cleanDateObject(to))
    >= createDateFromObject(cleanDateObject(from))) {
    return null
  }

  return INVALID_DATE_RANGE
}

export default dateRangeValidator
