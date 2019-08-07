import { hasYesOrNo } from 'models/validate'

const packageComments = {
  HasComments: { presence: true, hasValue: { validator: hasYesOrNo } },
  Comments: (value, attributes) => {
    if (attributes.HasComments && attributes.HasComments.value === 'Yes') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
}

export default packageComments
