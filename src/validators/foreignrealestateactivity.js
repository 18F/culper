/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignRealEstateActivity from 'models/sections/foreignRealEstateActivity'

export const validateForeignRealEstateActivity = (data, formType, options = {}) => (
  validateModel(data, foreignRealEstateActivity, options)
)
