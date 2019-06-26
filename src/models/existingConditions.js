import { hasYesOrNo, checkValue } from 'models/validate'
import diagnosis from 'models/diagnosis'

const existingConditions = {
  HasCondition: { presence: true, hasValue: { validator: hasYesOrNo } },
  DidNotFollow: (value, attributes) => {
    if (checkValue(attributes.HasCondition, 'Yes')) {
      return { presence: true, hasValue: { validator: hasYesOrNo } }
    }
    return {}
  },
  DidNotFollowExplanation: (value, attributes) => {
    if (checkValue(attributes.DidNotFollow, 'Yes')) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  ReceivedTreatment: (value, attributes) => {
    if (checkValue(attributes.HasCondition, 'Yes')) {
      return {
        presence: true,
        hasValue: { validator: { inclusion: ['Yes', 'No', 'Decline'] } },
      }
    }
    return {}
  },
  Explanation: (value, attributes) => {
    if (checkValue(attributes.ReceivedTreatment, 'No')) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  TreatmentList: (value, attributes) => {
    if (checkValue(attributes.ReceivedTreatment, 'Yes')) {
      return {
        presence: true,
        accordion: { validator: diagnosis, existingCondition: true },
      }
    }
    return {}
  },
}

export default existingConditions
