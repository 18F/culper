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
  Counter: (value, attributes, attributeName, options) => {
    if (options.requireForeignCounterIntelligence) {
      return { presence: true, hasValue: { validator: hasYesOrNo } }
    }
    return {}
  },
  CounterExplanation: (value, attributes, attributeName, options) => {
    const { Counter } = attributes
    if (
      options.requireForeignCounterIntelligence
      && Counter
      && Counter.value === 'Yes'
    ) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  Interest: (value, attributes, attributeName, options) => {
    if (options.requireForeignExcessiveKnowledge) {
      return { presence: true, hasValue: { validator: hasYesOrNo } }
    }
    return {}
  },
  InterestExplanation: (value, attributes, attributeName, options) => {
    const { Interest } = attributes
    if (
      options.requireForeignExcessiveKnowledge
      && Interest
      && Interest.value === 'Yes'
    ) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  Sensitive: (value, attributes, attributeName, options) => {
    if (options.requireForeignSensitiveInformation) {
      return { presence: true, hasValue: { validator: hasYesOrNo } }
    }
    return {}
  },
  SensitiveExplanation: (value, attributes, attributeName, options) => {
    const { Sensitive } = attributes
    if (
      options.requireForeignSensitiveInformation
      && Sensitive
      && Sensitive.value === 'Yes'
    ) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  Threatened: (value, attributes, attributeName, options) => {
    if (options.requireForeignThreatened) {
      return { presence: true, hasValue: { validator: hasYesOrNo } }
    }
    return {}
  },
  ThreatenedExplanation: (value, attributes, attributeName, options) => {
    const { Threatened } = attributes
    if (
      options.requireForeignThreatened
      && Threatened
      && Threatened.value === 'Yes'
    ) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
}

export default foreignTravel
