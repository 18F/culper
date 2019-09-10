import { validateModel } from 'models/validate'
import foreignPassport from 'models/foreignPassport'
import foreignPassportTravel from 'models/foreignPassportTravel'

export const validateForeignPassportTravel = data => (
  validateModel(data, foreignPassportTravel)
)

export const validateForeignPassport = data => (
  validateModel(data, foreignPassport)
)

export const validateCitizenshipPassports = (data) => {
  const citizenshipPassportsModel = {
    Passports: {
      presence: true,
      branchCollection: {
        validator: foreignPassport,
      },
    },
  }

  return validateModel(data, citizenshipPassportsModel)
}
