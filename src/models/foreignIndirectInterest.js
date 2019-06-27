import { foreignCoOwnersModel } from 'validators/foreigncoowner'

const foreignIndirectInterest = {
  InterestTypes: {
    presence: true,
    array: {
      validator: { presence: true },
      length: { minimum: 1 },
    },
  },
  InterestType: { presence: true, hasValue: true },
  // TODO add name pattern validations
  Firstname: { presence: true, hasValue: true },
  // TODO add name pattern validations
  Lastname: { presence: true, hasValue: true },
  Relationship: { presence: true, hasValue: true },
  // TODO <= NOW
  Acquired: { presence: true, date: true },
  HowAcquired: { presence: true, hasValue: true },
  Cost: { presence: true, hasValue: true },
  Value: { presence: true, hasValue: true },
  // TODO >= date acquired, future allowed
  Sold: (value, attributes) => {
    const { SoldNotApplicable } = attributes
    if (SoldNotApplicable && SoldNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, date: true }
  },
  Explanation: (value, attributes) => {
    const { SoldNotApplicable } = attributes
    if (SoldNotApplicable && SoldNotApplicable.applicable === false) {
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

export default foreignIndirectInterest
