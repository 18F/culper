/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalAssociationsTerrorist from 'models/sections/legalAssociationsTerrorist'

export const validateLegalTerrorist = (data, formType, options = {}) => (
  validateModel(data, legalAssociationsTerrorist, options)
)
