import { validateModel } from 'models/validate'
import offense from 'models/offense'

export const validatePoliceOffenses = (data) => {
  const policeOffensesModel = {
    List: {
      presence: true,
      branchCollection: { validator: offense },
    },
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
