/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalAssociationsEngaged from 'models/sections/legalAssociationsEngaged'

export const validateLegalAssociationEngaged = (data, formType, options = {}) => (
  validateModel(data, legalAssociationsEngaged, options)
)
