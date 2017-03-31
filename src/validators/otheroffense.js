import AddressValidator from './address'
import SentenceValidator from './sentence'
import { validGenericTextfield, validDateField } from './helpers'

export default class OtherOffenseValidator {
  constructor (state = {}, props = {}) {
    this.date = state.Date
    this.description = state.Description
    this.involvedViolence = state.InvolvedViolence
    this.involvedFirearms = state.InvolvedFirearms
    this.involvedSubstances = state.InvolvedSubstances
    this.agencyAddress = state.AgencyAddress
    this.explanation = state.Explanation
    this.courtName = state.CourtName
    this.courtAddress = state.CourtAddress
    this.courtType = state.CourtType
    this.courtCharge = state.CourtCharge
    this.courtOutcome = state.CourtOutcome
    this.courtDate = state.CourtDate
    this.sentence = state.Sentence
    this.wasSentenced = state.WasSentenced
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
    return !!this.courtAddress && new AddressValidator(this.courtAddress, null).isValid()
  }

  validCourtType () {
    return !!this.courtType && ['Felony', 'Misdemeanor', 'Other'].includes(this.courtType)
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
      return new SentenceValidator(this.sentence, null).isValid()
    }

    return false
  }

  isValid () {
    return this.validDate() &&
      this.validDescription() &&
      this.validViolence() &&
      this.validFirearms() &&
      this.validSubstances() &&
      this.validCourtName() &&
      this.validCourtType() &&
      this.validCourtCharge() &&
      this.validCourtOutcome() &&
      this.validCourtDate() &&
      this.validSentenced()
  }
}
