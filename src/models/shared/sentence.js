import { hasYesOrNo } from 'models/validate'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const sentence = {
  Description: { presence: true, hasValue: true },
  ExceedsYear: (value, attributes, attributeName, options) => {
    if (options.requireLegalOffenseSentenced) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }
    return {}
  },
  Incarcerated: (value, attributes, attributeName, options) => {
    if (options.requireLegalOffenseIncarcerated) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }
    return {}
  },
  IncarcerationDates: (value, attributes, attributeName, options = {}) => {
    if (attributes.IncarcerationDatesNA
      && attributes.IncarcerationDatesNA.applicable === false) {
      return {}
    }

    const { applicantBirthdate } = options

    const daterangeOptions = {
      earliest: applicantBirthdate,
      latest: DEFAULT_LATEST,
    }

    if (attributes.Incarcerated && attributes.Incarcerated.value === 'Yes') {
      daterangeOptions.minDuration = { years: 1 }
    } else if (attributes.Incarcerated && attributes.Incarcerated.value === 'No') {
      daterangeOptions.maxDuration = { years: 1 }
    }

    return {
      presence: true,
      daterange: daterangeOptions,
    }
  },
  ProbationDates: (value, attributes, attributeName, options = {}) => {
    if (attributes.ProbationDatesNA
      && attributes.ProbationDatesNA.applicable === false) {
      return {}
    }

    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
}

export default sentence
