/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import substanceDrugClearanceUsesModel from 'models/sections/substanceDrugClearanceUses'

export const validateDrugClearanceUses = (data, formType, options = {}) => (
  validateModel(data, substanceDrugClearanceUsesModel, options)
)
