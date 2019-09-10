import address from 'models/shared/locations/address'
import { DEFAULT_LATEST } from 'constants/dateLimits'

export const appeal = {
  CourtName: { presence: true, hasValue: true },
  CourtAddress: {
    presence: true,
    location: {
      validator: address,
      allowPOBox: false,
    },
  },
  Disposition: { presence: true, hasValue: true },
}

const order = {
  CourtName: { presence: true, hasValue: true },
  CourtAddress: {
    presence: true,
    location: {
      validator: address,
      allowPOBox: false,
    },
  },
  Disposition: (value, attributes, attributeName, options) => {
    if (options && options.requireDisposition === false) return {}
    return { presence: true, hasValue: true }
  },
  Occurred: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { requireDay: false, earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Appeals: {
    presence: true,
    branchCollection: { validator: appeal },
  },
}

export default order
