/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalAssociationsActivities from 'models/sections/legalAssociationsActivities'

export const validateLegalAssociationActivities = (data, formType, options = {}) => (
  validateModel(data, legalAssociationsActivities, options)
)
