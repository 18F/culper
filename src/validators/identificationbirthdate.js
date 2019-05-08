import { validateModel } from 'models/validate'
import date from 'models/shared/date'
import { SELF } from 'constants/dateLimits'

export const validateIdentificationBirthDate = (data) => {
  const { day, month, year } = data.Date

  return validateModel({
    date: { day, month, year },
  }, date, { ...SELF }) === true
}

export default class IdentificationBirthDateValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationBirthDate(this.data)
  }
}
