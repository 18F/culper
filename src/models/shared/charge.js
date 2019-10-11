import { offenseChargeTypes } from 'constants/enums/legalOptions'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const charge = {
  ChargeType: {
    presence: true,
    hasValue: { validator: { inclusion: offenseChargeTypes } },
  },
  CourtCharge: { presence: true, hasValue: true },
  CourtOutcome: { presence: true, hasValue: true },
  CourtDate: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { requireDay: false, earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
}

export default charge
