/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import historyFederal from 'models/sections/historyFederalService'

export const validateHistoryFederal = (data, formType, options = {}) => (
  validateModel(data, historyFederal, options)
)
