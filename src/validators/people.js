import { validateModel } from 'models/validate'
import person from 'models/person'

const minimumYears = 7
const minimumPeople = 3

export const validatePeople = (data, formType, options = {}) => {
  const peopleModel = {
    List: {
      presence: true,
      accordion: {
        validator: person,
        length: { minimum: minimumPeople },
      },
      durationCoverage: {
        requiredDuration: { years: minimumYears },
      },
    },
  }

  return validateModel(data, peopleModel, options)
}
