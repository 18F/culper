import { validGenericTextfield, validDateField } from './helpers'

export default class SignatureValidator {
  constructor (state = {}, props = {}) {
    this.signature = props.Signature || {}
  }

  validSignature () {
    return this.validSignatureName() && this.validSignatureDate()
  }

  validSignatureName () {
    return !!this.signature.Name && validGenericTextfield(this.signature.Name)
  }

  validSignatureDate () {
    return !!this.signature.Date && validDateField(this.signature.Date)
  }

  isValid () {
    return this.validSignature()
  }
}
