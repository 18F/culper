/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import identificationDateOfBirth from 'models/sections/identificationDateOfBirth'

export const validateIdentificationBirthDate = data => (
  validateModel(data, identificationDateOfBirth) === true
)
