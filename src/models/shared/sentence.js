import { hasYesOrNo } from 'models/validate'

const sentence = {
  Description: { presence: true, hasValue: true },
  ExceedsYear: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  Incarcerated: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  IncarcerationDates: (value, attributes) => {
    if (attributes.IncarcerationDatesNA
      && attributes.IncarcerationDatesNA.applicable === false) {
      return {}
    }

    const daterangeOptions = {}
    if (attributes.ExceedsYear && attributes.ExceedsYear.value === 'Yes') {
      daterangeOptions.minDuration = { years: 1 }
    } else if (attributes.ExceedsYear && attributes.ExceedsYear.value === 'No') {
      daterangeOptions.maxDuration = { years: 1 }
    }

    return {
      presence: true,
      daterange: daterangeOptions,
    }
  },
  ProbationDates: (value, attributes) => {
    if (attributes.ProbationDatesNA
      && attributes.ProbationDatesNA.applicable === false) {
      return {}
    }

    return {
      presence: true,
      daterange: true,
    }
  },
}

export default sentence
