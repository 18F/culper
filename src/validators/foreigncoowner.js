import { validateModel } from 'models/validate'
import foreignCoOwner from 'models/shared/foreignCoOwner'

export const foreignCoOwnersModel = {
  List: {
    presence: true,
    branchCollection: { validator: foreignCoOwner },
  },
}

export const validateForeignCoOwner = data => validateModel(data, foreignCoOwner)
export const validateForeignCoOwners = data => validateModel(data, foreignCoOwnersModel)

export default class ForeignCoOwnersValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignCoOwners(this.data) === true
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
    return validateForeignCoOwner(this.data) === true
  }
}
