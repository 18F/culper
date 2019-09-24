/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalAssociationsAdvocating from 'models/sections/legalAssociationsAdvocating'

export const validateLegalAssociationAdvocate = (data, formType, options = {}) => (
  validateModel(data, legalAssociationsAdvocating, options)
)
