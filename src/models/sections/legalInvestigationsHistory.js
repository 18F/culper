import { hasYesOrNo } from 'models/validate'
import investigation from 'models/investigation'

const legalInvestigationsHistoryModel = {
  HasHistory: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasHistory && attributes.HasHistory.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: investigation },
      }
    }
    return {}
  },
}

export default legalInvestigationsHistoryModel
