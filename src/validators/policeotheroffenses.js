import { validateModel } from 'models/validate'
import otherOffense from 'models/otherOffense'

export const validatePoliceOtherOffenses = (data) => {
  const policeOtherOffensesModel = {
    List: {
      presence: true,
      branchCollection: { validator: otherOffense },
    },
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
