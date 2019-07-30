import { validateModel } from 'models/validate'
import education from 'models/education'
import historyEducation from 'models/sections/historyEducation'

export const validateEducation = data => (
  validateModel(data, education) === true
)

export const validateHistoryEducation = data => (
  validateModel(data, historyEducation) === true
)

export default class HistoryEducationValidator {
  constructor(data = {}) {
    this.data = data
  }

  validAttendance() {
    return validateModel(this.data, {
      HasAttended: historyEducation.HasAttended,
      HasDegree10: historyEducation.HasDegree10,
    }) === true
  }

  validList() {
    return validateModel(this.data, {
      List: historyEducation.List,
    }) === true
  }

  isValid() {
    return validateHistoryEducation(this.data)
  }
}

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
    return validateEducation(this.data)
  }
}
