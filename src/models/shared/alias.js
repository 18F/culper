import name from 'models/shared/name'
import { hasYesOrNo } from 'models/validate'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const alias = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  MaidenName: (value, attributes, attributeName, options) => (
    options && options.hideMaiden
      ? {}
      : {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
  ),
  Dates: (value, attributes, attributeName, options) => {
    const dateLimits = { latest: DEFAULT_LATEST }
    if (options.earliest) dateLimits.earliest = options.earliest

    return {
      presence: true,
      daterange: dateLimits,
    }
  },
  Reason: {
    presence: true,
    hasValue: true,
  },
}

export default alias
