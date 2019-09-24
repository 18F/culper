/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalAssociationsOverthrow from 'models/sections/legalAssociationsOverthrow'

export const validateLegalOverthrow = (data, formType, options = {}) => (
  validateModel(data, legalAssociationsOverthrow, options)
)
