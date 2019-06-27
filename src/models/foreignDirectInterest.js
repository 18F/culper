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
  // TODO <= NOW
  Acquired: { presence: true, date: true },
  HowAcquired: { presence: true, hasValue: true },
  Cost: { presence: true, hasValue: true },
  Value: { presence: true, hasValue: true },
  // TODO >= DOB, <= NOW
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
