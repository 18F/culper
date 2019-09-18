/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import historyEducation from 'models/sections/historyEducation'

export const validateHistoryEducation = (data, formType, options = {}) => (
  validateModel(data, historyEducation, options)
)
