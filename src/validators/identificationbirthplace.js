/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import identificationPlaceOfBirth from 'models/sections/identificationPlaceOfBirth'

export const validateIdentificationBirthPlace = (data) => {

  const applicantBirthPlaceModel = {
    Location: {
      presence: true,
      location: { validator: birthplace, requireCity: !data.Location.county, requireCounty: !data.Location.city },
    },
  }

  return validateModel(data, applicantBirthPlaceModel)
}