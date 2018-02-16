import LocationValidator from './location'
import SentenceValidator from './sentence'
import { validGenericTextfield, validDateField, validBranch } from './helpers'

export default class OtherOffenseValidator {
  constructor (data = {}) {
    this.date = data.Date
    this.description = data.Description
    this.involvedViolence = (data.InvolvedViolence || {}).value
    this.involvedFirearms = (data.InvolvedFirearms || {}).value
    this.involvedSubstances = (data.InvolvedSubstances || {}).value
    this.agencyAddress = data.AgencyAddress
    this.explanation = data.Explanation
    this.courtName = data.CourtName
    this.courtAddress = data.CourtAddress
    this.chargeType = data.ChargeType
    this.courtCharge = data.CourtCharge
    this.courtOutcome = data.CourtOutcome
    this.courtDate = data.CourtDate
    this.sentence = data.Sentence
    this.wasSentenced = (data.WasSentenced || {}).value
    this.awaitingTrial = (data.AwaitingTrial || {}).value
    this.awaitingTrialExplanation = data.AwaitingTrialExplanation
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validDescription () {
    return !!this.description && validGenericTextfield(this.description)
  }

  validViolence () {
    return this.involvedViolence === 'Yes' || this.involvedViolence === 'No'
  }

  validFirearms () {
    return this.involvedFirearms === 'Yes' || this.involvedFirearms === 'No'
  }

  validSubstances () {
    return this.involvedSubstances === 'Yes' || this.involvedSubstances === 'No'
  }

  validCourtName () {
    return !!this.courtName && validGenericTextfield(this.courtName)
  }

  validCourtAddress () {
    return !!this.courtAddress && new LocationValidator(this.courtAddress).isValid()
  }

  validChargeType () {
    return !!this.chargeType && ['Felony', 'Misdemeanor', 'Other'].includes(this.chargeType)
  }

  validCourtCharge () {
    return !!this.courtCharge && validGenericTextfield(this.courtCharge)
  }

  validCourtOutcome () {
    return !!this.courtOutcome && validGenericTextfield(this.courtOutcome)
  }

  validCourtDate () {
    return !!this.courtDate && validDateField(this.courtDate)
  }

  validSentenced () {
    if (this.wasSentenced === 'No') {
      return true
    }

    if (this.wasSentenced === 'Yes') {
      return new SentenceValidator(this.sentence).isValid()
    }

    return false
  }

  validAwaitingTrial () {
    if (this.wasSentenced === 'No') {
      return validBranch(this.awaitingTrial) &&
        validGenericTextfield(this.awaitingTrialExplanation)
    }
    return true
  }

  isValid () {
    return this.validDate() &&
      this.validDescription() &&
      this.validViolence() &&
      this.validFirearms() &&
      this.validSubstances() &&
      this.validCourtName() &&
      this.validChargeType() &&
      this.validCourtCharge() &&
      this.validCourtOutcome() &&
      this.validCourtDate() &&
      this.validSentenced() &&
      this.validAwaitingTrial()
  }
}
