import { hasYesOrNo } from 'models/validate'
import federal from 'models/federal'

const historyFederal = {
  HasFederalService: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    // Only required if HasFederalService is yes
    if (attributes.HasFederalService && attributes.HasFederalService.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: federal },
      }
    }

    return {}
  },
}

export default historyFederal
