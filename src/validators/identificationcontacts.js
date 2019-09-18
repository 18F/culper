/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import identificationContactInfo from 'models/sections/identificationContactInfo'

export const validateIdentificationContactInformation = (data, formType, options = {}) => (
  validateModel(data, identificationContactInfo, options)
)
