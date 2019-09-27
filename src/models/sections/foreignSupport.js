import { hasYesOrNo } from 'models/validate'
import foreignSupport from 'models/foreignSupport'

const foreignActivitiesSupportModel = {
  HasForeignSupport: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasForeignSupport && attributes.HasForeignSupport.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: foreignSupport },
      }
    }

    return {}
  },
}

export default foreignActivitiesSupportModel
