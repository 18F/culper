/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignBusinessSponsorship from 'models/sections/foreignBusinessSponsorship'

export const validateForeignBusinessSponsorship = (data, formType, options = {}) => (
  validateModel(data, foreignBusinessSponsorship, options)
)
