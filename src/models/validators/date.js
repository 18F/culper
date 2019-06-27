import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import date from 'models/shared/date'

const dateValidator = (value, options) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const data = {
    ...value,
    date: { ...value }, // This will get validated as a complete luxon date object
  }

  const errors = validateModel(data, date, options)
  if (errors !== true) return errors

  return null
}

export default dateValidator
