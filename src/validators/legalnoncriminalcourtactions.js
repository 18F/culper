/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalNonCriminalCourtActions from 'models/sections/legalNonCriminalCourtActions'

export const validateLegalNonCriminalCourtActions = (data, formType, options = {}) => (
  validateModel(data, legalNonCriminalCourtActions, options)
)
