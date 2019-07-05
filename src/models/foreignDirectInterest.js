import { DEFAULT_LATEST } from 'constants/dateLimits'
import { foreignCoOwnersModel } from 'validators/foreigncoowner'

const foreignDirectInterest = {
  InterestTypes: {
    presence: true,
    array: {
      validator: { presence: true },
      length: { minimum: 1 },
    },
  },
  InterestType: { presence: true, hasValue: true },
  Acquired: { presence: true, date: { latest: DEFAULT_LATEST } },
  HowAcquired: { presence: true, hasValue: true },
  Cost: { presence: true, hasValue: true },
  Value: { presence: true, hasValue: true },
  Relinquished: (value, attributes) => {
    const { RelinquishedNotApplicable } = attributes
    if (RelinquishedNotApplicable && RelinquishedNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, date: true }
  },
  Explanation: (value, attributes) => {
    const { RelinquishedNotApplicable } = attributes
    if (RelinquishedNotApplicable && RelinquishedNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, hasValue: true }
  },
  CoOwners: {
    presence: true,
    model: {
      validator: foreignCoOwnersModel,
    },
  },
}

export default foreignDirectInterest
