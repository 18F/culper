import { validateModel } from 'models/validate'
import person from 'models/person'

const minimumYears = 7
const minimumPeople = 3

export const validatePeople = (data) => {
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

  return validateModel(data, peopleModel) === true
}

export default class PeopleValidator {
  constructor(data = {}) {
    this.data = data
  }

  validCount() {
    // Return number of items that pass the person validator
    return this.data.List.items.filter(i => i && i.Item && validateModel(i.Item, person)).length
  }

  isValid() {
    return validatePeople(this.data)
  }
}
