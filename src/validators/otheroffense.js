import store from 'services/store'
import * as formTypes from 'constants/formTypes'
import { validateModel } from 'models/validate'
import otherOffense from 'models/otherOffense'
import { requireLegalPoliceFirearms, requireLegalPoliceDrugs } from 'helpers/branches'

const options = formType => (
  {
    requireLegalPoliceFirearms: requireLegalPoliceFirearms(formType),
    requireLegalPoliceDrugs: requireLegalPoliceDrugs(formType),
  }
)

export const validateOtherOffense = (data, formType) => (
  validateModel(data, otherOffense, options(formType))
)

export default class OtherOffenseValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType || formTypes.SF86
  }

  validDate() {
    return validateModel(this.data, {
      Date: otherOffense.Date,
    }, options(this.formType)) === true
  }

  validDescription() {
    return validateModel(this.data, {
      Description: otherOffense.Description,
    }, options(this.formType)) === true
  }

  validViolence() {
    return validateModel(this.data, {
      InvolvedViolence: otherOffense.InvolvedViolence,
    }, options(this.formType)) === true
  }

  validFirearms() {
    return validateModel(this.data, {
      InvolvedFirearms: otherOffense.InvolvedFirearms,
    }, options(this.formType)) === true
  }

  validSubstances() {
    return validateModel(this.data, {
      InvolvedSubstances: otherOffense.InvolvedSubstances,
    }, options(this.formType)) === true
  }

  validCourtName() {
    return validateModel(this.data, {
      CourtName: otherOffense.CourtName,
    }, options(this.formType)) === true
  }

  validCourtAddress() {
    return validateModel(this.data, {
      CourtAddress: otherOffense.CourtAddress,
    }, options(this.formType)) === true
  }

  validChargeType() {
    return validateModel(this.data, {
      ChargeType: otherOffense.ChargeType,
    }, options(this.formType)) === true
  }

  validCourtCharge() {
    return validateModel(this.data, {
      CourtCharge: otherOffense.CourtCharge,
    }, options(this.formType)) === true
  }

  validCourtOutcome() {
    return validateModel(this.data, {
      CourtOutcome: otherOffense.CourtOutcome,
    }, options(this.formType)) === true
  }

  validCourtDate() {
    return validateModel(this.data, {
      CourtDate: otherOffense.CourtDate,
    }, options(this.formType)) === true
  }

  validSentenced() {
    return validateModel(this.data, {
      WasSentenced: otherOffense.WasSentenced,
      Sentence: otherOffense.Sentence,
    }, options) === true
  }

  validAwaitingTrial() {
    return validateModel(this.data, {
      AwaitingTrial: otherOffense.AwaitingTrial,
      AwaitingTrialExplanation: otherOffense.AwaitingTrialExplanation,
    }, options(this.formType)) === true
  }

  isValid() {
    return validateOtherOffense(this.data, this.formType) === true
  }
}
