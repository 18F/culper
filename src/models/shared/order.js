import address from 'models/shared/locations/address'

export const appeal = {
  CourtName: { presence: true, hasValue: true },
  CourtAddress: {
    presence: true,
    location: {
      validator: address,
      allowPOBox: false
    }
  },
  Disposition: { presence: true, hasValue: true },
}

const order = {
  CourtName: { presence: true, hasValue: true },
  CourtAddress: {
    presence: true,
    location: {
      validator: address,
      allowPOBox: false
    }
  },
  Disposition: (value, attributes, attributeName, options) => {
    if (options && options.requireDisposition === false) return {}
    return { presence: true, hasValue: true }
  },
  Occurred: { presence: true, date: { requireDay: false } },
  Appeals: {
    presence: true,
    branchCollection: { validator: appeal },
  },
}

export default order
