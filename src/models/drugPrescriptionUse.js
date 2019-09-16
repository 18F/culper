import { hasYesOrNo } from 'models/validate'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const drugPrescriptionUse = {
  PrescriptionName: { presence: true, hasValue: true },
  InvolvementDates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Reason: { presence: true, hasValue: true },
  UseWhileEmployed: (value, attributes, attributeName, options) => {
    if (options && options.requireUseWhileEmployed === false) return {}
    return { presence: true, hasValue: { validator: hasYesOrNo } }
  },
  UseWithClearance: (value, attributes, attributeName, options) => {
    if (options && options.requireUseWithClearance === false) return {}
    return { presence: true, hasValue: { validator: hasYesOrNo } }
  },
}

export default drugPrescriptionUse
