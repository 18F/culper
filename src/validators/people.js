/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import relationshipsPeopleModel from 'models/sections/relationshipsPeople'

export const validatePeople = (data, formType, options = {}) => (
  validateModel(data, relationshipsPeopleModel, options)
)
