import { validateModel, hasYesOrNo, checkValue } from 'models/validate'
import offense from 'models/offense'

export const validatePoliceOffenses = (data) => {
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

  return validateModel(data, policeOffensesModel) === true
}

export default class PoliceOffensesValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validatePoliceOffenses(this.data)
  }
}
