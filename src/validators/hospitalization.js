/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import hospitalization from 'models/sections/hospitalization'

export const validateHospitalizations = (data, formType, options = {}) => (
  validateModel(data, hospitalization, options)
)
