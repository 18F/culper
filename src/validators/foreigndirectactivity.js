/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignDirectActivity from 'models/sections/foreignDirectActivity'

export const validateForeignDirectActivity = (data, formType, options = {}) => (
  validateModel(data, foreignDirectActivity, options)
)
