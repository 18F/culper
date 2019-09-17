import { validateModel } from 'models/validate'
import federal from 'models/federal'
import historyFederal from 'models/sections/historyFederalService'

export const validateHistoryFederal = (data, formType, options = {}) => (
  validateModel(data, historyFederal, options)
)
