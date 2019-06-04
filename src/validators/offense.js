import { validateModel } from 'models/validate'
import offense from 'models/offense'

export const validateOffense = data => validateModel(data, offense) === true

export default class OffenseValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDate() {
    return validateModel(this.data, {
      Date: offense.Date,
    }) === true
  }

  validDescription() {
    return validateModel(this.data, {
      Description: offense.Description,
    }) === true
  }

  validViolence() {
    return validateModel(this.data, {
      InvolvedViolence: offense.InvolvedViolence,
    }) === true
  }

  validFirearms() {
    return validateModel(this.data, {
      InvolvedFirearms: offense.InvolvedFirearms,
    }) === true
  }

  validSubstances() {
    return validateModel(this.data, {
      InvolvedSubstances: offense.InvolvedSubstances,
    }) === true
  }

  validAddress() {
    return validateModel(this.data, {
      Address: offense.Address,
    }) === true
  }

  validCited() {
    return validateModel(this.data, {
      WasCited: offense.WasCited,
    }) === true
  }

  validCitedBy() {
    return validateModel(this.data, {
      CitedBy: offense.CitedBy,
    }) === true
  }

  validAgencyAddress() {
    return validateModel(this.data, {
      AgencyAddress: offense.AgencyAddress,
    }) === true
  }

  validCharged() {
    return validateModel(this.data, {
      WasCharged: offense.WasCharged,
    }) === true
  }

  validExplanation() {
    return validateModel(this.data, {
      Explanation: offense.Explanation,
    }) === true
  }

  validCourtName() {
    return validateModel(this.data, {
      CourtName: offense.CourtName,
    }) === true
  }

  validCourtAddress() {
    return validateModel(this.data, {
      CourtAddress: offense.CourtAddress,
    }) === true
  }

  validChargeType() {
    return validateModel(this.data, {
      ChargeType: offense.ChargeType,
    }) === true
  }

  validCourtCharge() {
    return validateModel(this.data, {
      CourtCharge: offense.CourtCharge,
    }) === true
  }

  validCourtOutcome() {
    return validateModel(this.data, {
      CourtOutcome: offense.CourtOutcome,
    }) === true
  }

  validCourtDate() {
    return validateModel(this.data, {
      CourtDate: offense.CourtDate,
    }) === true
  }

  validSentenced() {
    return validateModel(this.data, {
      WasSentenced: offense.WasSentenced,
      Sentence: offense.Sentence,
    }) === true
  }

  validAwaitingTrial() {
    return validateModel(this.data, {
      AwaitingTrial: offense.AwaitingTrial,
      AwaitingTrialExplanation: offense.AwaitingTrialExplanation,
    }) === true
  }

  isValid() {
    return validateOffense(this.data)
  }
}
