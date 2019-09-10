import { validateModel } from 'models/validate'
import federal from 'models/federal'
import historyFederal from 'models/sections/historyFederalService'

export const validateHistoryFederal = data => (
  validateModel(data, historyFederal)
)
