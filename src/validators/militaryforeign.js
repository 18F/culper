import store from 'services/store'
import { validateModel } from 'models/validate'
import militaryForeign, { foreignMilitaryContact } from 'models/militaryForeign'

const validateForeignContact = data => (
  validateModel(data, foreignMilitaryContact) === true
)
export class ForeignContactValidator {
  constructor(data) {
    this.data = data
  }

  isValid() {
    return validateForeignContact(this.data)
  }
}

export class ForeignServiceValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = {
      ...data,
      formType,
    }
  }

  isValid() {
    return validateModel(this.data, militaryForeign) === true
  }
}

const militaryForeignModel = {
  List: {
    presence: true,
    branchCollection: {
      validator: militaryForeign,
    },
  },
}

const validateMilitaryForeign = data => (
  validateModel(data, militaryForeignModel) === true
)

export default class MilitaryForeignValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateMilitaryForeign(this.data)
  }
}
