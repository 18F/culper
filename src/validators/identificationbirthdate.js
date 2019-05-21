import { validateModel } from 'models/validate'
import { SELF } from 'constants/dateLimits'

export const validateIdentificationBirthDate = (data) => {
  const applicantBirthDateModel = {
    Date: {
      presence: true,
      date: { ...SELF },
    },
  }

  return validateModel(data, applicantBirthDateModel) === true
}

export default class IdentificationBirthDateValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationBirthDate(this.data)
  }
}
