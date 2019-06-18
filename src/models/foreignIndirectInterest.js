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
  Firstname: { presence: true, hasValue: true },
  Lastname: { presence: true, hasValue: true },
  Relationship: { presence: true, hasValue: true },
  Acquired: { presence: true, date: { requireDay: false } },
  HowAcquired: { presence: true, hasValue: true },
  Cost: { presence: true, hasValue: true },
  Value: { presence: true, hasValue: true },
  Sold: (value, attributes) => {
    const { SoldNotApplicable } = attributes
    if (SoldNotApplicable && SoldNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, date: { requireDay: false } }
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
