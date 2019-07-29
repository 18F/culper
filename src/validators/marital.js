import { validateModel } from 'models/validate'
import relationshipsMarital from 'models/sections/relationshipsMarital'

export const validateMarital = data => validateModel(data, relationshipsMarital) === true

export default class MaritalValidator {
  constructor(data = {}) {
    this.data = data
  }

  validStatus() {
    return validateModel(this.data, { Status: relationshipsMarital.Status }) === true
  }

  validDivorce() {
    return validateModel(this.data, {
      DivorcedList: relationshipsMarital.DivorcedList,
    }) === true
  }

  isValid() {
    return validateMarital(this.data)
  }
}
