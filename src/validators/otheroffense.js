import { validateModel } from 'models/validate'
import otherOffense from 'models/otherOffense'

export const validateOtherOffense = data => validateModel(data, otherOffense) === true

export default class OtherOffenseValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDate() {
    return validateModel(this.data, {
      Date: otherOffense.Date,
    }) === true
  }

  validDescription() {
    return validateModel(this.data, {
      Description: otherOffense.Description,
    }) === true
  }

  validViolence() {
    return validateModel(this.data, {
      InvolvedViolence: otherOffense.InvolvedViolence,
    }) === true
  }

  validFirearms() {
    return validateModel(this.data, {
      InvolvedFirearms: otherOffense.InvolvedFirearms,
    }) === true
  }

  validSubstances() {
    return validateModel(this.data, {
      InvolvedSubstances: otherOffense.InvolvedSubstances,
    }) === true
  }

  validCourtName() {
    return validateModel(this.data, {
      CourtName: otherOffense.CourtName,
    }) === true
  }

  validCourtAddress() {
    return validateModel(this.data, {
      CourtAddress: otherOffense.CourtAddress,
    }) === true
  }

  validSentenced() {
    return validateModel(this.data, {
      WasSentenced: otherOffense.WasSentenced,
      Sentence: otherOffense.Sentence,
    }) === true
  }

  validAwaitingTrial() {
    return validateModel(this.data, {
      AwaitingTrial: otherOffense.AwaitingTrial,
      AwaitingTrialExplanation: otherOffense.AwaitingTrialExplanation,
    }) === true
  }

  isValid() {
    return validateOtherOffense(this.data)
  }
}
