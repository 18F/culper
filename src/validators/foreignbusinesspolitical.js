/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignBusinessPolitical from 'models/sections/foreignBusinessPolitical'

export const validateForeignBusinessPolitical = (data, formType, options = {}) => (
  validateModel(data, foreignBusinessPolitical, options)
)
