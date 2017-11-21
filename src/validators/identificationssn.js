import { validSSN } from './helpers'

export default class IdentificationBirthPlaceValidator {
  constructor (data = {}) {
    this.ssn = data.ssn || {}
    this.verified = data.verified || false
  }

  isValid () {
    return validSSN(this.ssn) && this.verified
  }
}
