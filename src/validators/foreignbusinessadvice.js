/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignBusinessAdvice from 'models/sections/foreignBusinessAdvice'

export const validateForeignBusinessAdvice = (data, formType, options = {}) => (
  validateModel(data, foreignBusinessAdvice, options)
)
