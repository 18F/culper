import { hasYesOrNo } from 'models/validate'
import foreignBusinessConferences from 'models/foreignBusinessConferences'

const foreignBusinessConferencesModel = {
  HasForeignConferences: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasForeignConferences && attributes.HasForeignConferences.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: foreignBusinessConferences },
      }
    }

    return {}
  },
}

export default foreignBusinessConferencesModel
