import { validateModel } from 'models/validate'
import employment from 'models/employment'

export const validateEmployment = data => (
  validateModel(data, employment)
)

export const validateHistoryEmployment = (data) => {
  const historyEmploymentModel = {
    EmploymentRecord: {
      presence: true,
      hasValue: {
        validator: { inclusion: ['No'] },
      },
    },
    List: {
      presence: true,
      accordion: { validator: employment },
    },
  }

  return validateModel(data, historyEmploymentModel)
}

export default class HistoryEmploymentValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateHistoryEmployment(this.data) === true
  }
}

export class EmploymentValidator {
  constructor(data = {}) {
    this.data = data
  }

  validStatus() {
    return validateModel(this.data, { Status: employment.Status }) === true
  }

  validTitle() {
    return validateModel(this.data, { Title: employment.Title }) === true
  }

  validAddress() {
    return validateModel(this.data, { Address: employment.Address }) === true
  }

  validAdditionalActivity() {
    return validateModel(this.data, { Additional: employment.Additional }) === true
  }

  validTelephone() {
    return validateModel(this.data, { Telephone: employment.Telephone }) === true
  }

  validPhysicalAddress() {
    return validateModel(this.data, { PhysicalAddress: employment.PhysicalAddress }) === true
  }

  validReasonLeft() {
    return validateModel(this.data, { ReasonLeft: employment.ReasonLeft }) === true
  }

  validSupervisor() {
    return validateModel(this.data, { Supervisor: employment.Supervisor }) === true
  }

  validReprimand() {
    return validateModel(this.data, { Reprimand: employment.Reprimand }) === true
  }

  isValid() {
    return validateEmployment(this.data) === true
  }
}
