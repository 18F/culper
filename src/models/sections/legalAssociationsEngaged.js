import { hasYesOrNo } from 'models/validate'
import terrorismEngaged from 'models/terrorismEngaged'

const legalAssociationEngagedModel = {
  HasEngaged: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasEngaged && attributes.HasEngaged.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: terrorismEngaged },
      }
    }

    return {}
  },
}

export default legalAssociationEngagedModel
