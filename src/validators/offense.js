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
  }

  validDate () {
    // console.log('date', this.date)
    return !!this.date && validDateField(this.date)
  }

  validDescription () {
    // console.log('description', this.description)
    return this.description && validGenericTextfield(this.description)
  }

  validViolence () {
    // console.log('violence', this.involvedViolence)
    return this.involvedViolence === 'Yes' || this.involvedViolence === 'No'
  }

  validFirearms () {
    // console.log('firearms', this.involvedFirearms)
    return this.involvedFirearms === 'Yes' || this.involvedFirearms === 'No'
  }

  validSubstances () {
    // console.log('substances', this.involvedSubstances)
    return this.involvedSubstances === 'Yes' || this.involvedSubstances === 'No'
  }

  validAddress () {
    // console.log('address', this.address)
    return !!this.address && new AddressValidator(this.address, null).isValid()
  }

  validCited () {
    // console.log('cited', this.wasCited)
    return this.wasCited === 'Yes' || this.wasCited === 'No'
  }

  isValid () {
    return this.validDate() &&
      this.validDescription() &&
      this.validViolence() &&
      this.validFirearms() &&
      this.validSubstances() &&
      this.validAddress() &&
      this.validCited()
  }
}
