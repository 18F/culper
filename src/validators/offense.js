import AddressValidator from './address'
import { validGenericTextfield, validDateField } from './helpers'

export default class OffenseValidator {
  constructor (state = {}, props = {}) {
    this.date = state.Date
    this.description = state.Description
    this.involvedViolence = state.InvolvedViolence
    this.involvedFirearms = state.InvolvedFirearms
    this.involvedSubstances = state.InvolvedSubstances
    this.address = state.Address
    this.wasCited = state.WasCited
    this.citedBy = state.CitedBy
    this.agencyAddress = state.AgencyAddress
    this.wasCharged = state.WasCharged
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

  validAddress () {
    return !!this.address && new AddressValidator(this.address, null).isValid()
  }

  validCited () {
    return this.wasCited === 'Yes' || this.wasCited === 'No'
  }

  validCitedBy () {
    if (this.wasCited === 'No') {
      return true
    }

    return !!this.citedBy && validGenericTextfield(this.citedBy)
  }

  validAgencyAddress () {
    if (this.wasCited === 'No') {
      return true
    }

    return !!this.agencyAddress && new AddressValidator(this.agencyAddress, null).isValid()
  }

  validCharged () {
    if (this.wasCited === 'No') {
      return true
    }

    return this.wasCharged === 'Yes' || this.wasCharged === 'No'
  }

  isValid () {
    return this.validDate() &&
      this.validDescription() &&
      this.validViolence() &&
      this.validFirearms() &&
      this.validSubstances() &&
      this.validAddress() &&
      this.validCited() &&
      this.validCitedBy() &&
      this.validAgencyAddress() &&
      this.validCharged()
  }
}
