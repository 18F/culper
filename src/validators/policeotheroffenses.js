import { validateModel, hasYesOrNo, checkValue } from 'models/validate'
import otherOffense from 'models/otherOffense'

export const validatePoliceOtherOffenses = (data) => {
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

  return validateModel(data, policeOtherOffensesModel) === true
}

export default class PoliceOtherOffensesValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validatePoliceOtherOffenses(this.data)
  }
}
