import { validGenericTextfield } from './helpers'

export const hideSelectiveService = (store = {}) => {
  const selectiveService = new Date(1959, 11, 31)
  const birthdate =
    ((store.Identification || {}).ApplicantBirthDate || {}).Date || {}

  // If nothing has been persisted
  if (!birthdate.date) {
    return false
  }

  // If there is no valid date present
  if (isNaN(birthdate.date)) {
    return false
  }

  // Check the limits
  return birthdate.date <= selectiveService
}

export default class SelectiveServiceValidator {
  constructor(data = {}) {
    this.wasBornAfter = (data.WasBornAfter || {}).value
    this.hasRegistered = (data.HasRegistered || {}).value
    this.registrationNumber = data.RegistrationNumber
    this.explanation = data.Explanation
  }

  validBornAfter() {
    return this.wasBornAfter === 'Yes' || this.wasBornAfter === 'No'
  }

  validRegistered() {
    return (
      this.wasBornAfter === 'No' ||
      (this.wasBornAfter === 'Yes' &&
        (this.hasRegistered === 'Yes' || this.hasRegistered === 'No'))
    )
  }

  validRegistrationNumber() {
    if (this.wasBornAfter === 'Yes' && this.hasRegistered === 'Yes') {
      return validGenericTextfield(this.registrationNumber)
    }

    return true
  }

  validExplanation() {
    if (this.wasBornAfter === 'Yes' && this.hasRegistered === 'No') {
      return validGenericTextfield(this.explanation)
    }

    return true
  }

  isValid() {
    return (
      this.validBornAfter() &&
      this.validRegistered() &&
      this.validRegistrationNumber() &&
      this.validExplanation()
    )
  }
}
