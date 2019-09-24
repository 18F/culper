/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignBusinessFamily from 'models/sections/foreignBusinessFamily'

export const validateForeignBusinessFamily = (data, formType, options = {}) => (
  validateModel(data, foreignBusinessFamily, options)
)
