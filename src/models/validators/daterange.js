import { validateModel } from 'models/validate'
import { today, cleanDateObject, createDateFromObject } from 'helpers/date'

const dateRangeValidator = (value = {}) => {
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

  return 'To date must be after from date'
}

export default dateRangeValidator
