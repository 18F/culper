/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignBenefitActivity from 'models/sections/foreignBenefitActivity'

export const validateForeignBenefitActivity = (data, formType, options = {}) => (
  validateModel(data, foreignBenefitActivity, options)
)
