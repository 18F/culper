import person from 'models/person'

// TODO - these should maybe be passed in as validator options
const minimumYears = 7
const minimumPeople = 3

const relationshipsPeopleModel = {
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

export default relationshipsPeopleModel
