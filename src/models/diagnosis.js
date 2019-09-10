import { hasYesOrNo } from 'models/validate'
import treatment from 'models/treatment'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const diagnosis = {
  Condition: (value, attributes, attributeName, options) => {
    if (options && options.existingCondition) return {}

    return {
      presence: true,
      hasValue: true,
    }
  },
  Diagnosed: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Treatment: { presence: true, model: { validator: treatment } },
  TreatmentFacility: { presence: true, model: { validator: treatment } },
  Effective: (value, attributes, attributeName, options) => {
    if (options && options.existingCondition) return {}

    return {
      presence: true,
      hasValue: { validator: hasYesOrNo },
    }
  },
  Explanation: (value, attributes) => {
    if (attributes.Effective && attributes.Effective.value === 'No') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
}

export default diagnosis
