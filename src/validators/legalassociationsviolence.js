/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalAssociationsViolence from 'models/sections/legalAssociationsViolence'

export const validateLegalViolence = (data, formType, options = {}) => (
  validateModel(data, legalAssociationsViolence, options)
)
