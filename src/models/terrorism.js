import { hasYesOrNo } from 'models/validate'

const terrorism = {
  HasTerrorism: { presence: true, hasValue: { validator: hasYesOrNo } },
  Explanation: (value, attributes) => {
    if (attributes.HasTerrorism && attributes.HasTerrorism.value === 'Yes') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
}

export default terrorism
