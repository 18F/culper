/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignBusinessContact from 'models/sections/foreignBusinessContact'

export const validateForeignBusinessContacts = (data, formType, options = {}) => (
  validateModel(data, foreignBusinessContact, options)
)
