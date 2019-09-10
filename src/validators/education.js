import { validateModel } from 'models/validate'
import education from 'models/education'
import historyEducation from 'models/sections/historyEducation'

export const validateHistoryEducation = data => (
  validateModel(data, historyEducation)
)
