import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import date from 'models/shared/date'

import { cleanDateObject, createDateFromObject } from 'helpers/date'

const dateValidator = (value, options) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const dateObj = createDateFromObject(cleanDateObject(value))
  const data = {
    ...value,
    date: dateObj,
  }

  const errors = validateModel(data, date, options)
  if (errors !== true) return errors

  return null
}

export default dateValidator
