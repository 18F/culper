/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignBusinessVentures from 'models/sections/foreignBusinessVentures'

export const validateForeignBusinessVentures = (data, formType, options = {}) => (
  validateModel(data, foreignBusinessVentures, options)
)
