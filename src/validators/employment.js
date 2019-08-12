import { validateModel } from 'models/validate'
import employment from 'models/employment'
import historyEmployment from 'models/sections/historyEmployment'
import * as formTypes from 'constants/formTypes'
import * as formConfig from 'config/forms'

export const validateEmployment = data => (
  validateModel(data, employment) === true
)

export const validateHistoryEmployment = (data, formType = formTypes.SF86) => {
  // TODO years requirement is not enforced by validator yet
  const years = formType
    && formConfig[formType]
    && formConfig[formType].HISTORY_EMPLOYMENT_YEARS

  return validateModel(data, historyEmployment, { requireYears: years }) === true
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
    return validateEmployment(this.data)
  }
}
