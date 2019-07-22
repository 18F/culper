import person from 'models/person'

const minimumYears = 7
const minimumPeople = 3

const relationshipsPeople = {
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

export default relationshipsPeople
