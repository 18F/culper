/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import militaryForeign from 'models/sections/militaryForeign'

import { requireForeignMilitaryMaintainsContact } from 'helpers/branches'

export const validateMilitaryForeign = (data, formType, options = {}) => (
  validateModel(data, militaryForeign, {
    ...options,
    requireForeignMilitaryMaintainsContact: requireForeignMilitaryMaintainsContact(formType),
  })
)
