/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import identificationPlaceOfBirth from 'models/sections/identificationPlaceOfBirth'

export const validateIdentificationBirthPlace = (data) => {

  return validateModel(data, identificationPlaceOfBirth)
}