import { validateModel, checkValue } from 'models/validate'
import usPassport from 'models/usPassport'

export const validateUsPassport = (data, formType, options = {}) => (
  validateModel(data, usPassport, options)
)

export const hasValidUSPassport = (data = {}) => {
  const { HasPassports = {} } = data
  return checkValue(HasPassports, 'Yes') && validateUsPassport(data) === true
}
