import { validateModel } from 'models/validate'
import divorce from 'models/divorce'

export const validateDivorce = data => validateModel(data, divorce) === true

export default class DivorceValidator {
  constructor(data = {}) {
    this.data = data
  }

  validStatus() {
    return validateModel(this.data, { Status: divorce.Status }) === true
  }

  validDivorceLocation() {
    return validateModel(this.data, { DivorceLocation: divorce.DivorceLocation }) === true
  }

  validDeceased() {
    return validateModel(this.data, {
      Deceased: divorce.Deceased,
      DeceasedAddress: divorce.DeceasedAddress,
    }) === true
  }

  validCitizenship() {
    return validateModel(this.data, { Citizenship: divorce.Citizenship }) === true
  }

  isValid() {
    return validateDivorce(this.data)
  }
}
