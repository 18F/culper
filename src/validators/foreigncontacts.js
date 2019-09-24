/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignContacts from 'models/sections/foreignContacts'

export const validateForeignContacts = (data, formType, options = {}) => (
  validateModel(data, foreignContacts, options)
)
