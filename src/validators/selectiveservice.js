import { validGenericTextfield } from './helpers'
import { extractDate } from '../components/Section/History/dateranges'

export const hideSelectiveService = (store = {}) => {
  const selectiveService = new Date(1959, 11, 31)
  const birthdate =
    ((store.Identification || {}).ApplicantBirthDate || {}).Date || {}

  // Check the limits
  return extractDate(birthdate) <= selectiveService
}

export default class SelectiveServiceValidator {
  constructor(data = {}) {
    this.wasBornAfter = (data.WasBornAfter || {}).value
    this.hasRegistered = (data.HasRegistered || {}).value
    this.hasRegisteredNotApplicable = data.HasRegisteredNotApplicable
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
        (this.hasRegistered === 'Yes' ||
          this.hasRegistered === 'No' ||
          !this.hasRegisteredNotApplicable.applicable))
    )
  }

  validRegistrationNumber() {
    if (this.wasBornAfter === 'Yes' && this.hasRegistered === 'Yes') {
      return !!(
        this.registrationNumber &&
        this.registrationNumber.value &&
        /^\d*$/g.test(this.registrationNumber.value)
      )
    }

    return true
  }

  validExplanation() {
    if (
      this.wasBornAfter === 'Yes' &&
      (this.hasRegistered === 'No' ||
        !this.hasRegisteredNotApplicable.applicable)
    ) {
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
