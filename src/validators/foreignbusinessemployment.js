/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignBusinessEmployment from 'models/sections/foreignBusinessEmployment'

export const validateForeignBusinessEmployment = (data, formType, options = {}) => (
  validateModel(data, foreignBusinessEmployment, options)
)
