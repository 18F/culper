import { validateModel, hasYesOrNo } from 'models/validate'
import { extractDate } from '../components/Section/History/dateranges'

export const hideSelectiveService = (store = {}) => {
  const selectiveService = new Date(1959, 11, 31)
  const birthdate = ((store.Identification || {}).ApplicantBirthDate || {}).Date || {}

  // Check the limits
  return extractDate(birthdate) <= selectiveService
}

const selectiveServiceModel = {
  WasBornAfter: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  HasRegistered: (value, attributes = {}) => {
    if (attributes.WasBornAfter === 'Yes') {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }
    return {}
  },
  RegistrationNumber: (value, attributes = {}) => {
    if (attributes.HasRegistered === 'Yes') {
      return {
        presence: true,
        numericality: {
          onlyInteger: true,
        },
      }
    }
    return {}
  },
  Explanation: (value, attributes = {}) => {
    if (
      (attributes.HasRegisteredNotApplicable && !attributes.HasRegisteredNotApplicable.applicable)
      || attributes.HasRegistered === 'No'
    ) {
      return {
        presence: true,
      }
    }
    return {}
  },
}

export const validateBornAfter = data => (
  validateModel(data, { value: selectiveServiceModel.WasBornAfter }) === true
)

export const validateRegistered = data => (
  validateModel(data, { value: selectiveServiceModel.HasRegistered }) === true
)

export const validateRegistrationNumber = data => (
  validateModel(data, { value: selectiveServiceModel.RegistrationNumber }) === true
)

export const validateExplanation = data => (
  validateModel(data, { value: selectiveServiceModel.Explanation }) === true
)

export const validateSelectiveService = (data = {}) => {
  const {
    WasBornAfter, HasRegistered, RegistrationNumber, Explanation,
  } = data

  return validateBornAfter(WasBornAfter)
    && validateRegistered(HasRegistered)
    && validateRegistrationNumber(RegistrationNumber)
    && validateExplanation(Explanation)
}

export default class SelectiveServiceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateSelectiveService(this.data)
  }
}
