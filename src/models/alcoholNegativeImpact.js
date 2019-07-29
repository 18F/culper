import { DEFAULT_LATEST } from 'constants/dateLimits'

const alcoholNegativeImpact = {
  Occurred: (value, attributes) => {
    const dateLimits = { latest: DEFAULT_LATEST }

    if (attributes.Used && attributes.Used.from) {
      dateLimits.earliest = attributes.Used.from
    }

    return {
      presence: true,
      date: { requireDay: false, ...dateLimits },
    }
  },
  Circumstances: { presence: true, hasValue: true },
  NegativeImpact: { presence: true, hasValue: true },
  Used: { presence: true, daterange: true },
}

export default alcoholNegativeImpact
