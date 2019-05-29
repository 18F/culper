import { validateModel } from 'models/validate'
import person from 'models/person'

export const validatePerson = data => validateModel(data, person) === true

/** Object Validators (as classes) - legacy */
export default class PersonValidator {
  constructor(data = {}) {
    this.data = data
  }

  validName() {
    return validateModel(this.data, { Name: person.name }) === true
  }

  validDates() {
    return validateModel(this.data, { Dates: person.Dates }) === true
  }

  validRank() {
    return validateModel(this.data, { Rank: person.Rank }) === true
  }

  validRelationship() {
    return validateModel(this.data, {
      Relationship: person.Relationship,
      RelationshipOther: person.RelationshipOther,
    }) === true
  }

  validPhones() {
    return validateModel(this.data, {
      MobileTelephone: person.MobileTelephone,
      OtherTelephone: person.OtherTelephone,
    }) === true
  }

  validEmail() {
    return validateModel(this.data, { Email: person.Email }) === true
  }

  validAddress() {
    return validateModel(this.data, { Address: person.Address }) === true
  }

  isValid() {
    return validatePerson(this.data)
  }
}
