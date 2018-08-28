import { validGenericTextfield, validDateField } from './helpers'

export default class SignatureValidator {
  constructor(data = {}) {
    this.signature = data.Signature || {}
  }

  validSignature() {
    return this.validSignatureName() && this.validSignatureDate()
  }

  validSignatureName() {
    return !!this.signature.Name && validGenericTextfield(this.signature.Name)
  }

  validSignatureDate() {
    return !!this.signature.Date && validDateField(this.signature.Date)
  }

  isValid() {
    return this.validSignature()
  }
}
