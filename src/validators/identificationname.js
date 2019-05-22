import { validateModel } from 'models/validate'
import name from 'models/shared/name'

export const validateIdentificationName = (data) => {
  const applicantNameModel = {
    Name: {
      presence: true,
      model: { validator: name },
    },
  }

  return validateModel(data, applicantNameModel) === true
}

/** LEGACY */
export default class IdentificationNameValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationName(this.data)
  }
}
