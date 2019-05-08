import { validateModel } from 'models/validate'
import date from 'models/shared/date'
import { SELF } from 'constants/dateLimits'

export const validateIdentificationBirthDate = (data) => {
  const { Date } = data
  const { day, month, year } = Date

  return validateModel({
    date: { day, month, year },
  }, date, { ...SELF }) === true
}

export default class IdentificationBirthDateValidator {
  constructor(data = {}) {
    this.data = data
    this.date = data.Date || {}
  }

  isValid() {
    return validateIdentificationBirthDate(this.data)
  }
}
