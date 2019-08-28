import store from 'services/store'
import * as formTypes from 'constants/formTypes'
import { validateModel, hasYesOrNo, checkValue } from 'models/validate'
import otherOffense from 'models/otherOffense'
import { requireLegalPoliceFirearms, requireLegalPoliceDrugs } from 'helpers/branches'

export const validatePoliceOtherOffenses = (data, formType) => {
  const options = {
    requireLegalPoliceFirearms: requireLegalPoliceFirearms(formType),
    requireLegalPoliceDrugs: requireLegalPoliceDrugs(formType),
  }

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

  return validateModel(data, policeOtherOffensesModel, options)
}

export default class PoliceOtherOffensesValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType || formTypes.SF86
  }

  isValid() {
    return validatePoliceOtherOffenses(this.data, this.formType) === true
  }
}
