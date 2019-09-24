/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignBusinessConferences from 'models/sections/foreignBusinessConferences'

export const validateForeignBusinessConferences = (data, formType, options = {}) => (
  validateModel(data, foreignBusinessConferences, options)
)
