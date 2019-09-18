/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import militaryForeign from 'models/militaryForeign'
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
