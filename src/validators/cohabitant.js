/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import relationshipsCohabitantsModel from 'models/sections/relationshipsCohabitants'

export const validateCohabitants = (data, formType, options = {}) => (
  validateModel(data, relationshipsCohabitantsModel, options)
)
