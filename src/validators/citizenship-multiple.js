/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import citizenshipMultiple from 'models/sections/citizenshipMultiple'

import { requireMultipleCitizenshipRenounced } from 'helpers/branches'

export const validateCitizenshipMultiple = (data = {}, formType, options = {}) => {
  const requireCitizenshipRenounced = requireMultipleCitizenshipRenounced(formType)
  return validateModel(data, citizenshipMultiple, { ...options, requireCitizenshipRenounced })
}
