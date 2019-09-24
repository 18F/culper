import { hasYesOrNo, checkValue } from 'models/validate'
import offense from 'models/offense'

const policeOffensesModel = {
  HasOffenses: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => (
    checkValue(attributes.HasOffenses, 'Yes')
      ? {
        presence: true,
        accordion: { validator: offense },
      } : {}
  ),
}

export default policeOffensesModel
