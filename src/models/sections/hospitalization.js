import { hasYesOrNo } from 'models/validate'
import hospitalization from 'models/hospitalization'

const hospitalizationsModel = {
  Hospitalized: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.Hospitalized && attributes.Hospitalized.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: hospitalization },
      }
    }
    return {}
  },
}

export default hospitalizationsModel
