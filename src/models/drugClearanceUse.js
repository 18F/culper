import { DEFAULT_LATEST } from 'constants/dateLimits'

const drugClearanceUse = {
  Description: { presence: true, hasValue: true },
  InvolvementDates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  EstimatedUse: { presence: true, hasValue: true },
}

export default drugClearanceUse
