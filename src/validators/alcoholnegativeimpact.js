/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import substanceAlcoholNegativeImpactsModel from 'models/sections/substanceAlcoholNegativeImpacts'

export const validateNegativeImpacts = (data, formType, options = {}) => (
  validateModel(data, substanceAlcoholNegativeImpactsModel, options)
)
