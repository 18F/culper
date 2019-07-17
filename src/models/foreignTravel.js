import { hasYesOrNo } from 'models/validate'

const daysOptions = [
  '1-5',
  '6-10',
  '11-20',
  '21-30',
  'More than 30',
  'Many short trips',
]

const purposeOptions = [
  'Business',
  'Volunteer',
  'Education',
  'Tourism',
  'Conference',
  'Family',
  'Other',
]

const foreignTravel = {
  Country: { presence: true, country: true },
  Dates: { presence: true, daterange: true },
  Days: { presence: true, hasValue: { validator: { inclusion: daysOptions } } },
  Purpose: {
    presence: true,
    array: {
      length: { minimum: 1 },
      validator: { inclusion: purposeOptions },
    },
  },
  Questioned: { presence: true, hasValue: { validator: hasYesOrNo } },
  QuestionedExplanation: (value, attributes) => {
    const { Questioned } = attributes
    if (Questioned && Questioned.value === 'Yes') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  Encounter: { presence: true, hasValue: { validator: hasYesOrNo } },
  EncounterExplanation: (value, attributes) => {
    const { Encounter } = attributes
    if (Encounter && Encounter.value === 'Yes') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  Contacted: { presence: true, hasValue: { validator: hasYesOrNo } },
  ContactedExplanation: (value, attributes) => {
    const { Contacted } = attributes
    if (Contacted && Contacted.value === 'Yes') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  Counter: { presence: true, hasValue: { validator: hasYesOrNo } },
  CounterExplanation: (value, attributes) => {
    const { Counter } = attributes
    if (Counter && Counter.value === 'Yes') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  Interest: { presence: true, hasValue: { validator: hasYesOrNo } },
  InterestExplanation: (value, attributes) => {
    const { Interest } = attributes
    if (Interest && Interest.value === 'Yes') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  Sensitive: { presence: true, hasValue: { validator: hasYesOrNo } },
  SensitiveExplanation: (value, attributes) => {
    const { Sensitive } = attributes
    if (Sensitive && Sensitive.value === 'Yes') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  Threatened: { presence: true, hasValue: { validator: hasYesOrNo } },
  ThreatenedExplanation: (value, attributes) => {
    const { Threatened } = attributes
    if (Threatened && Threatened.value === 'Yes') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
}

export default foreignTravel
