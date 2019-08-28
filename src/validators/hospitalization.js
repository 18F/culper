import { validateModel, hasYesOrNo } from 'models/validate'
import hospitalization from 'models/hospitalization'

const hospitalizationsModel = {
  Hospitalized: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.Hospitalized && attributes.Hospitalized.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: hospitalization },
      }
    }
    return {}
  },
}

export const validateHospitalization = data => (
  validateModel(data, hospitalization)
)

export const validateHospitalizations = data => (
  validateModel(data, hospitalizationsModel)
)

export default class HospitalizationsValidator {
  constructor(data = {}) {
    this.data = data
  }

  validHospitalization() {
    return validateModel(this.data, {
      Hospitalized: hospitalizationsModel.Hospitalized,
    }) === true
  }

  isValid() {
    return validateHospitalizations(this.data) === true
  }
}

export class HospitalizationValidator {
  constructor(data = {}) {
    this.data = data
  }

  validAdmission() {
    return validateModel(this.data, {
      Admission: hospitalization.Admission,
      Explanation: hospitalization.Explanation,
    }) === true
  }

  isValid() {
    return validateHospitalization(this.data) === true
  }
}
