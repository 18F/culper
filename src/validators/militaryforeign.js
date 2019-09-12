import store from 'services/store'
import { validateModel } from 'models/validate'
import militaryForeign, { foreignMilitaryContact } from 'models/militaryForeign'
import { requireForeignMilitaryMaintainsContact } from 'helpers/branches'

const militaryForeignModel = {
  List: {
    presence: true,
    branchCollection: {
      validator: militaryForeign,
    },
  },
}

export const validateMilitaryForeign = (data, formType, options = {}) => (
  validateModel(data, militaryForeignModel, {
    ...options,
    requireForeignMilitaryMaintainsContact: requireForeignMilitaryMaintainsContact(formType),
  })
)
