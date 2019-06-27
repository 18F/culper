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
  validateModel(data, hospitalization) === true
)

export const validateHospitalizations = data => (
  validateModel(data, hospitalizationsModel) === true
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
    return validateHospitalizations(this.data)
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
    return validateHospitalization(this.data)
  }
}
