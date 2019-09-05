import selectiveService from 'models/selectiveService'
import { validateModel } from 'models/validate'
import { extractDate } from '../components/Section/History/dateranges'

export const hideSelectiveService = (store = {}) => {
  const selectiveServiceDate = new Date(1959, 11, 31)
  const birthdate = ((store.Identification || {}).ApplicantBirthDate || {}).Date || {}

  // Check the limits
  return extractDate(birthdate) <= selectiveServiceDate
}

export const validateSelectiveService = data => (
  validateModel(data, selectiveService)
)

export default class SelectiveServiceValidator {
  constructor(data = {}) {
    this.data = data
  }

  validBornAfter() {
    return validateModel(this.data, { WasBornAfter: selectiveService.WasBornAfter }) === true
  }

  validRegistered() {
    return validateModel(this.data, { HasRegistered: selectiveService.HasRegistered }) === true
  }

  validRegistrationNumber() {
    return validateModel(this.data, { RegistrationNumber: selectiveService.RegistrationNumber }) === true
  }

  validExplanation() {
    return validateModel(this.data, { Explanation: selectiveService.Explanation }) === true
  }

  isValid() {
    return validateSelectiveService(this.data) === true
  }
}
