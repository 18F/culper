import { hasYesOrNo } from 'models/validate'
import terrorismAdvocate from 'models/terrorismAdvocate'

const legalAssociationAdvocateModel = {
  HasAdvocated: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasAdvocated && attributes.HasAdvocated.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: terrorismAdvocate },
      }
    }

    return {}
  },
}

export default legalAssociationAdvocateModel
