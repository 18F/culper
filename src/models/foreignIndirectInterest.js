import { foreignCoOwnersModel } from 'validators/foreigncoowner'
import { namePattern } from 'constants/patterns'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const foreignIndirectInterest = {
  InterestTypes: {
    presence: true,
    array: {
      validator: { presence: true },
      length: { minimum: 1 },
    },
  },
  InterestType: { presence: true, hasValue: true },
  Firstname: {
    presence: true,
    hasValue: { validator: { format: namePattern } },
  },
  Lastname: {
    presence: true,
    hasValue: { validator: { format: namePattern } },
  },
  Relationship: { presence: true, hasValue: true },
  Acquired: { presence: true, date: { latest: DEFAULT_LATEST } },
  HowAcquired: { presence: true, hasValue: true },
  Cost: { presence: true, hasValue: true },
  Value: { presence: true, hasValue: true },
  Sold: (value, attributes) => {
    const { Acquired, SoldNotApplicable } = attributes
    if (SoldNotApplicable && SoldNotApplicable.applicable === false) {
      return {}
    }

    const dateLimits = {}
    if (Acquired) dateLimits.earliest = Acquired

    return { presence: true, date: dateLimits }
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
