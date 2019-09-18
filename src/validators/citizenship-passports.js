/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignPassport from 'models/foreignPassport'

export const validateCitizenshipPassports = (data, formType, options = {}) => {
  const citizenshipPassportsModel = {
    Passports: {
      presence: true,
      branchCollection: {
        validator: foreignPassport,
      },
    },
  }

  return validateModel(data, citizenshipPassportsModel, options)
}
