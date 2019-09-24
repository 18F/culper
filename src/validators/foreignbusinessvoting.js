/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignBusinessVoting from 'models/sections/foreignBusinessVoting'

export const validateForeignBusinessVoting = (data, formType, options = {}) => (
  validateModel(data, foreignBusinessVoting, options)
)
