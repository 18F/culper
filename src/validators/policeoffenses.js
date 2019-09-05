import store from 'services/store'
import { validateModel, hasYesOrNo, checkValue } from 'models/validate'
import offense from 'models/offense'
import {
  requireLegalOffenseInvolvements,
  requireLegalOffenseSentenced,
  requireLegalOffenseIncarcerated,
} from 'helpers/branches'

export const validatePoliceOffenses = (data, formType) => {
  const options = {
    requireLegalOffenseInvolvements: requireLegalOffenseInvolvements(formType),
    requireLegalOffenseSentenced: requireLegalOffenseSentenced(formType),
    requireLegalOffenseIncarcerated: requireLegalOffenseIncarcerated(formType),
  }

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

  return validateModel(data, policeOffensesModel, options) === true
}

export default class PoliceOffensesValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validatePoliceOffenses(this.data, this.formType)
  }
}
