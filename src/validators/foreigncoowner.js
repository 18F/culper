import { validateModel } from 'models/validate'
import foreignCoOwner from 'models/shared/foreignCoOwner'

export const foreignCoOwnersModel = {
  List: {
    presence: true,
    branchCollection: { validator: foreignCoOwner },
  },
}

export const validateForeignCoOwner = data => validateModel(data, foreignCoOwner) === true
export const validateForeignCoOwners = data => validateModel(data, foreignCoOwnersModel) === true

export default class ForeignCoOwnersValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignCoOwners(this.data)
  }
}

export class ForeignCoOwnerValidator {
  constructor(data = {}) {
    this.data = data
  }

  validCountries() {
    return validateModel(this.data, {
      Countries: foreignCoOwner.Countries,
    }) === true
  }

  isValid() {
    return validateForeignCoOwner(this.data)
  }
}
