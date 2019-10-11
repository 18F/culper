import selectiveService from 'models/selectiveService'
import { validateModel } from 'models/validate'
import { extractDate } from '../components/Section/History/dateranges'

export const hideSelectiveService = (store = {}) => {
  const selectiveServiceDate = new Date(1959, 11, 31)
  const birthdate = ((store.Identification || {}).ApplicantBirthDate || {}).Date || {}

  // Check the limits
  return extractDate(birthdate) <= selectiveServiceDate
}

export const validateSelectiveService = (data, formType, options = {}) => (
  validateModel(data, selectiveService, options)
)
