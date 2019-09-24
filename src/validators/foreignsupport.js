/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import foreignSupport from 'models/sections/foreignSupport'

export const validateForeignActivitiesSupport = (data, formType, options = {}) => (
  validateModel(data, foreignSupport, options)
)
