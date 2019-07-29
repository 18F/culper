import { validateModel } from 'models/validate'
import person from 'models/person'
import relationshipsPeople from 'models/sections/relationshipsPeople'

export const validatePeople = data => (
  validateModel(data, relationshipsPeople) === true
)

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
