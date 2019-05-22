import { hasYesOrNo } from 'models/validate'

const selectiveService = {
  WasBornAfter: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  HasRegistered: (value, attributes = {}) => {
    if (
      attributes.WasBornAfter
      && attributes.WasBornAfter.value === 'Yes') {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }
    return {}
  },
  RegistrationNumber: (value, attributes = {}) => {
    if (
      attributes.HasRegistered
      && attributes.HasRegistered.value === 'Yes') {
      return {
        presence: true,
        hasValue: {
          validator: {
            numericality: { onlyInteger: true },
          },
        },
      }
    }
    return {}
  },
  Explanation: (value, attributes = {}) => {
    if (
      (attributes.HasRegisteredNotApplicable && !attributes.HasRegisteredNotApplicable.applicable)
      || (attributes.HasRegistered && attributes.HasRegistered.value === 'No')
    ) {
      return {
        presence: true,
        hasValue: true,
      }
    }
    return {}
  },
}

export default selectiveService
