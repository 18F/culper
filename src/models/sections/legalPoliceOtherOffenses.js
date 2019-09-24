import { hasYesOrNo, checkValue } from 'models/validate'
import otherOffense from 'models/otherOffense'

const policeOtherOffensesModel = {
  HasOtherOffenses: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => (
    checkValue(attributes.HasOtherOffenses, 'Yes')
      ? {
        presence: true,
        accordion: { validator: otherOffense },
      } : {}
  ),
}

export default policeOtherOffensesModel
