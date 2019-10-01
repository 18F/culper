import { hasYesOrNo } from 'models/validate'
import terrorist from 'models/terrorist'

const legalTerroristModel = {
  HasTerrorist: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasTerrorist && attributes.HasTerrorist.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: terrorist },
      }
    }
    return {}
  },
}

export default legalTerroristModel
