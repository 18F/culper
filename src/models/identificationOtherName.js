import { DEFAULT_LATEST } from 'constants/dateLimits'

import { hasYesOrNo } from 'models/validate'
import name from 'models/shared/name'

const identificationOtherName = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  MaidenName: { presence: true, hasValue: { validator: hasYesOrNo } },
  DatesUsed: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Reason: { presence: true, hasValue: true },
}

export default identificationOtherName
