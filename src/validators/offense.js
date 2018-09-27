import LocationValidator from './location'
import SentenceValidator from './sentence'
import { validGenericTextfield, validDateField, validBranch } from './helpers'

export default class OffenseValidator {
  constructor(data = {}) {
    this.date = data.Date
    this.description = data.Description
    this.involvedViolence = (data.InvolvedViolence || {}).value
    this.involvedFirearms = (data.InvolvedFirearms || {}).value
    this.involvedSubstances = (data.InvolvedSubstances || {}).value
    this.address = data.Address
    this.wasCited = (data.WasCited || {}).value
    this.citedBy = data.CitedBy
    this.agencyAddress = data.AgencyAddress
    this.wasCharged = (data.WasCharged || {}).value
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

  validDate() {
    return !!this.date && validDateField(this.date)
  }

  validDescription() {
    return !!this.description && validGenericTextfield(this.description)
  }

  validViolence() {
    return this.involvedViolence === 'Yes' || this.involvedViolence === 'No'
  }

  validFirearms() {
    return this.involvedFirearms === 'Yes' || this.involvedFirearms === 'No'
  }

  validSubstances() {
    return this.involvedSubstances === 'Yes' || this.involvedSubstances === 'No'
  }

  validAddress() {
    return !!this.address && new LocationValidator(this.address).isValid()
  }

  validCited() {
    return this.wasCited === 'Yes' || this.wasCited === 'No'
  }

  validCitedBy() {
    if (this.wasCited === 'No') {
      return true
    }

    return !!this.citedBy && validGenericTextfield(this.citedBy)
  }

  validAgencyAddress() {
    if (this.wasCited === 'No') {
      return true
    }

    return (
      !!this.agencyAddress &&
      new LocationValidator(this.agencyAddress).isValid()
    )
  }

  validCharged() {
    if (this.wasCited === 'No') {
      return true
    }

    return this.wasCharged === 'Yes' || this.wasCharged === 'No'
  }

  validExplanation() {
    if (this.wasCited === 'No' || this.wasCharged !== 'No') {
      return true
    }

    return !!this.explanation && validGenericTextfield(this.explanation)
  }

  validCourtName() {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return !!this.courtName && validGenericTextfield(this.courtName)
  }

  validCourtAddress() {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return (
      !!this.courtAddress && new LocationValidator(this.courtAddress).isValid()
    )
  }

  validChargeType() {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return (
      !!this.chargeType &&
      ['Felony', 'Misdemeanor', 'Other'].includes(this.chargeType.value)
    )
  }

  validCourtCharge() {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return !!this.courtCharge && validGenericTextfield(this.courtCharge)
  }

  validCourtOutcome() {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return !!this.courtOutcome && validGenericTextfield(this.courtOutcome)
  }

  validCourtDate() {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return !!this.courtDate && validDateField(this.courtDate)
  }

  validSentenced() {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    if (this.wasSentenced === 'No') {
      return true
    }

    if (this.wasSentenced === 'Yes') {
      return new SentenceValidator(this.sentence).isValid()
    }

    return false
  }

  validAwaitingTrial() {
    if (
      this.wasCharged === 'Yes' &&
      this.wasCited === 'Yes' &&
      this.wasSentenced === 'No'
    ) {
      return (
        validBranch(this.awaitingTrial) &&
        validGenericTextfield(this.awaitingTrialExplanation)
      )
    }
    return true
  }

  isValid() {
    return (
      this.validDate() &&
      this.validDescription() &&
      this.validViolence() &&
      this.validFirearms() &&
      this.validSubstances() &&
      this.validAddress() &&
      this.validCited() &&
      this.validCitedBy() &&
      this.validAgencyAddress() &&
      this.validCharged() &&
      this.validExplanation() &&
      this.validCourtName() &&
      this.validCourtAddress() &&
      this.validChargeType() &&
      this.validCourtCharge() &&
      this.validCourtOutcome() &&
      this.validCourtDate() &&
      this.validSentenced() &&
      this.validAwaitingTrial()
    )
  }
}
