import { validateModel, hasYesOrNo } from 'models/validate'
import { extractDate } from '../components/Section/History/dateranges'

export const hideSelectiveService = (store = {}) => {
  const selectiveService = new Date(1959, 11, 31)
  const birthdate = ((store.Identification || {}).ApplicantBirthDate || {}).Date || {}

  // Check the limits
  return extractDate(birthdate) <= selectiveService
}

const selectiveServiceModel = {
  wasBornAfter: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  hasRegistered: (value, attributes = {}) => {
    if (attributes.WasBornAfter && attributes.WasBornAfter.value === 'Yes') {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }
    return {}
  },
  registrationNumber: (value, attributes = {}) => {
    if (attributes.HasRegistered && attributes.HasRegistered.value === 'Yes') {
      return {
        presence: true,
        numericality: {
          onlyInteger: true,
        },
      }
    }
    return {}
  },
  explanation: (value, attributes = {}) => {
    if (
      (attributes.HasRegisteredNotApplicable && !attributes.HasRegisteredNotApplicable.applicable)
      || (attributes.HasRegistered && attributes.HasRegistered.value === 'No')
    ) {
      return {
        presence: true,
      }
    }
    return {}
  },
}

export default class SelectiveServiceValidator {
  constructor(data = {}) {
    this.data = data
    this.wasBornAfter = (data.WasBornAfter || {}).value
    this.hasRegistered = (data.HasRegistered || {}).value
    this.hasRegisteredNotApplicable = data.HasRegisteredNotApplicable
    this.registrationNumber = data.RegistrationNumber
    this.explanation = data.Explanation
  }

  validBornAfter() {
    return validateModel(this.data, { WasBornAfter: selectiveServiceModel.wasBornAfter }) === true
  }

  validRegistered() {
    return validateModel(this.data, { HasRegistered: selectiveServiceModel.hasRegistered }) === true
  }

  validRegistrationNumber() {
    return validateModel(this.data, { RegistrationNumber: selectiveServiceModel.registrationNumber }) === true
  }

  validExplanation() {
    return validateModel(this.data, { Explanation: selectiveServiceModel.explanation }) === true
  }

  isValid() {
    return (
      this.validBornAfter()
      && this.validRegistered()
      && this.validRegistrationNumber()
      && this.validExplanation()
    )
  }
}
