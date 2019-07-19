
import { hasYesOrNo } from 'models/validate'
import identificationOtherName from 'models/identificationOtherName'

const identificationOtherNames = {
  HasOtherNames: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasOtherNames
      && attributes.HasOtherNames.value
      && attributes.HasOtherNames.value === 'No') return {}

    return {
      presence: true,
      accordion: { validator: identificationOtherName },
    }
  },
}

export default identificationOtherNames
