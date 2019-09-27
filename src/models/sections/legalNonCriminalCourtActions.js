import { hasYesOrNo } from 'models/validate'
import nonCriminalCourtAction from 'models/nonCriminalCourtAction'

const legalNonCriminalCourtActionsModel = {
  HasCourtActions: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasCourtActions && attributes.HasCourtActions.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: nonCriminalCourtAction },
      }
    }
    return {}
  },
}

export default legalNonCriminalCourtActionsModel
