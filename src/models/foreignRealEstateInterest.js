import streetCityCountry from 'models/shared/locations/streetCityCountry'
import { foreignCoOwnersModel } from 'validators/foreigncoowner'

const foreignRealEstateInterest = {
  InterestTypes: {
    presence: true,
    array: {
      validator: { presence: true },
      length: { minimum: 1 },
    },
  },
  RealEstateType: { presence: true, hasValue: true },
  Address: { presence: true, location: { validator: streetCityCountry } },
  // TODO "DOBSpouseDOBCohabDOBFloor" unclear, future allowed
  Acquired: { presence: true, date: true },
  HowAcquired: { presence: true, hasValue: true },
  Cost: { presence: true, hasValue: true },
  Sold: (value, attributes) => {
    const { SoldNotApplicable } = attributes
    if (SoldNotApplicable && SoldNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, date: true }
  },
  CoOwners: {
    presence: true,
    model: {
      validator: foreignCoOwnersModel,
    },
  },
}

export default foreignRealEstateInterest
