import address from 'models/shared/locations/address'

const violence = {
  Organization: { presence: true, hasValue: true },
  Address: { presence: true, location: { validator: address } },
  // TODO >= DOB, <= NOW
  Dates: { presence: true, daterange: true },
  Positions: (value, attributes) => {
    if (attributes.PositionsNotApplicable
      && attributes.PositionsNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, hasValue: true }
  },
  Contributions: (value, attributes) => {
    if (attributes.ContributionsNotApplicable
      && attributes.ContributionsNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, hasValue: true }
  },
  Reasons: { presence: true, hasValue: true },
}

export default violence
