/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignIndirectActivity from 'models/sections/foreignIndirectActivity'

export const validateForeignIndirectActivity = (data, formType, options = {}) => (
  validateModel(data, foreignIndirectActivity, options)
)
