import { validateModel } from 'models/validate'
import education from 'models/education'
import historyEducation from 'models/sections/historyEducation'

export const validateEducation = data => (
  validateModel(data, education)
)

export const validateHistoryEducation = (data, formType, options = {}) => (
  validateModel(data, historyEducation, options)
)

export class EducationItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDates() {
    return validateModel(this.data, { Dates: education.Dates }) === true
  }

  validAddress() {
    return validateModel(this.data, { Address: education.Address }) === true
  }

  validName() {
    return validateModel(this.data, { Name: education.Name }) === true
  }

  validType() {
    return validateModel(this.data, { Type: education.Type }) === true
  }

  validReference() {
    return validateModel(this.data, {
      ReferenceName: education.ReferenceName,
      ReferencePhone: education.ReferencePhone,
      ReferenceEmail: education.ReferenceEmail,
      ReferenceAddress: education.ReferenceAddress,
    }) === true
  }

  validDiplomas() {
    return validateModel(this.data, { Diplomas: education.Diplomas }) === true
  }

  isValid() {
    return validateEducation(this.data) === true
  }
}
