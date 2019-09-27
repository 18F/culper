import { hasYesOrNo } from 'models/validate'
import foreignTravel from 'models/foreignTravel'

const foreignTravelModel = {
  HasForeignTravelOutside: { presence: true, hasValue: { validator: hasYesOrNo } },
  HasForeignTravelOfficial: (value, attributes) => {
    if (attributes.HasForeignTravelOutside
      && attributes.HasForeignTravelOutside.value === 'Yes') {
      return { presence: true, hasValue: { validator: hasYesOrNo } }
    }
    return {}
  },
  List: (value, attributes) => {
    const { HasForeignTravelOutside, HasForeignTravelOfficial } = attributes
    if ((HasForeignTravelOutside && HasForeignTravelOutside.value === 'Yes')
      && (HasForeignTravelOfficial && HasForeignTravelOfficial.value === 'No')) {
      return {
        presence: true,
        accordion: { validator: foreignTravel },
      }
    }

    return {}
  },
}

export default foreignTravelModel
