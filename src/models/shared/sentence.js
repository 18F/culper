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

    // TODO more than 1 year or less than 1 year based on ExceedsYear
    // TODO >= DOB, <= NOW
    return {
      presence: true,
      daterange: true,
    }
  },
  // TODO >= DOB, <= NOW
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
