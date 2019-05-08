import { validateModel } from 'models/validate'
import dateModel from 'models/shared/date'
import { SELF } from 'constants/dateLimits'

export const validateIdentificationBirthDate = (data = { Date: {} }) => {
  const date = data.Date || {}
  const { day, month, year } = date

  return validateModel({
    date: { day, month, year },
  }, dateModel, { ...SELF }) === true
}

export default class IdentificationBirthDateValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationBirthDate(this.data)
  }
}
