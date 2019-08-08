import { validateModel, hasYesOrNo } from 'models/validate'
import education from 'models/education'

const historyEducationModel = {
  HasAttended: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  HasDegree10: (value, attributes) => {
    // Only required if HasAttended is "No"
    if (attributes.HasAttended && attributes.HasAttended.value === 'No') {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }

    return {}
  },
  List: (value, attributes) => {
    // Only required if either HasAttended or HasDegree10 is yes
    if ((attributes.HasAttended && attributes.HasAttended.value === 'Yes')
      || (attributes.HasDegree10 && attributes.HasDegree10.value === 'Yes')) {
      return {
        presence: true,
        accordion: { validator: education },
      }
    }

    return {}
  },
}

export const validateEducation = data => (
  validateModel(data, education)
)

export const validateHistoryEducation = data => (
  validateModel(data, historyEducationModel)
)

export default class HistoryEducationValidator {
  constructor(data = {}) {
    this.data = data
  }

  validAttendance() {
    return validateModel(this.data, {
      HasAttended: historyEducationModel.HasAttended,
      HasDegree10: historyEducationModel.HasDegree10,
    }) === true
  }

  validList() {
    return validateModel(this.data, {
      List: historyEducationModel.List,
    }) === true
  }

  isValid() {
    return validateHistoryEducation(this.data) === true
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
    return validateEducation(this.data) === true
  }
}
