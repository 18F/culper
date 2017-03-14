import { validGenericTextfield } from './helpers'

export default class SelectiveServiceValidator {
  constructor (state, props) {
    this.wasBornAfter = state.WasBornAfter
    this.hasRegistered = state.HasRegistered
    this.registrationNumber = state.RegistrationNumber
    this.explanation = state.Explanation
  }

  validBornAfter () {
    return this.wasBornAfter === 'Yes' || this.wasBornAfter === 'No'
  }

  validRegistered () {
    return this.wasBornAfter === 'No' ||
      (this.wasBornAfter === 'Yes' && (this.hasRegistered === 'Yes' || this.hasRegistered === 'No'))
  }

  validRegistrationNumber () {
    if (this.wasBornAfter === 'Yes' && this.hasRegistered === 'Yes') {
      return validGenericTextfield(this.registrationNumber)
    }

    return true
  }

  validExplanation () {
    if (this.wasBornAfter === 'Yes' && this.hasRegistered === 'No') {
      return validGenericTextfield(this.explanation)
    }

    return true
  }

  isValid () {
    return this.validBornAfter() &&
      this.validRegistered() &&
      this.validRegistrationNumber() &&
      this.validExplanation()
  }
}
