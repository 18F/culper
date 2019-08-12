import store from 'services/store'
import { validateModel } from 'models/validate'
import offense from 'models/offense'
import {
  requireLegalOffenseInvolvements,
  requireLegalOffenseSentenced,
  requireLegalOffenseIncarcerated,
} from 'helpers/branches'

const options = formType => (
  {
    requireLegalOffenseInvolvements: requireLegalOffenseInvolvements(formType),
    requireLegalOffenseSentenced: requireLegalOffenseSentenced(formType),
    requireLegalOffenseIncarcerated: requireLegalOffenseIncarcerated(formType),
  }
)

export const validateOffense = (data, formType) => (
  validateModel(data, offense, options(formType)) === true
)

export default class OffenseValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  validDate() {
    return validateModel(this.data, {
      Date: offense.Date,
    }, options(this.formType)) === true
  }

  validDescription() {
    return validateModel(this.data, {
      Description: offense.Description,
    }, options(this.formType)) === true
  }

  validViolence() {
    return validateModel(this.data, {
      InvolvedViolence: offense.InvolvedViolence,
    }, options(this.formType)) === true
  }

  validFirearms() {
    return validateModel(this.data, {
      InvolvedFirearms: offense.InvolvedFirearms,
    }, options(this.formType)) === true
  }

  validSubstances() {
    return validateModel(this.data, {
      InvolvedSubstances: offense.InvolvedSubstances,
    }, options(this.formType)) === true
  }

  validAddress() {
    return validateModel(this.data, {
      Address: offense.Address,
    }, options(this.formType)) === true
  }

  validCited() {
    return validateModel(this.data, {
      WasCited: offense.WasCited,
    }, options(this.formType)) === true
  }

  validCitedBy() {
    return validateModel(this.data, {
      CitedBy: offense.CitedBy,
    }, options(this.formType)) === true
  }

  validAgencyAddress() {
    return validateModel(this.data, {
      AgencyAddress: offense.AgencyAddress,
    }, options(this.formType)) === true
  }

  validCharged() {
    return validateModel(this.data, {
      WasCharged: offense.WasCharged,
    }, options(this.formType)) === true
  }

  validExplanation() {
    return validateModel(this.data, {
      Explanation: offense.Explanation,
    }, options(this.formType)) === true
  }

  validCourtName() {
    return validateModel(this.data, {
      CourtName: offense.CourtName,
    }, options(this.formType)) === true
  }

  validCourtAddress() {
    return validateModel(this.data, {
      CourtAddress: offense.CourtAddress,
    }, options(this.formType)) === true
  }

  validChargeType() {
    return validateModel(this.data, {
      ChargeType: offense.ChargeType,
    }, options(this.formType)) === true
  }

  validCourtCharge() {
    return validateModel(this.data, {
      CourtCharge: offense.CourtCharge,
    }, options(this.formType)) === true
  }

  validCourtOutcome() {
    return validateModel(this.data, {
      CourtOutcome: offense.CourtOutcome,
    }, options(this.formType)) === true
  }

  validCourtDate() {
    return validateModel(this.data, {
      CourtDate: offense.CourtDate,
    }, options(this.formType)) === true
  }

  validSentenced() {
    return validateModel(this.data, {
      WasSentenced: offense.WasSentenced,
      Sentence: offense.Sentence,
    }, options(this.formType)) === true
  }

  validAwaitingTrial() {
    return validateModel(this.data, {
      AwaitingTrial: offense.AwaitingTrial,
      AwaitingTrialExplanation: offense.AwaitingTrialExplanation,
    }, options(this.formType)) === true
  }

  isValid() {
    return validateOffense(this.data, this.formType)
  }
}
