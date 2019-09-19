/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import substanceDrugPublicSafetyUsesModel from 'models/sections/substanceDrugPublicSafetyUses'

export const validateDrugSafetyUses = (data, formType, options = {}) => (
  validateModel(data, substanceDrugPublicSafetyUsesModel, options)
)
