import store from 'services/store'
import { validateModel } from 'models/validate'
import militaryForeign, { foreignMilitaryContact } from 'models/militaryForeign'
import * as formTypes from 'constants/formTypes'
import { requireForeignMilitaryMaintainsContact } from 'helpers/branches'

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
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validateModel(this.data, militaryForeign, {
      requireForeignMilitaryMaintainsContact: requireForeignMilitaryMaintainsContact(this.formType)
    }) === true
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

const validateMilitaryForeign = (data, formType = formTypes.SF86) => (
  validateModel(data, militaryForeignModel, {
    requireForeignMilitaryMaintainsContact: requireForeignMilitaryMaintainsContact(formType),
  }) === true
)

export default class MilitaryForeignValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validateMilitaryForeign(this.data, this.formType)
  }
}
