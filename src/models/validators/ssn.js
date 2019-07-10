import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import ssn from 'models/shared/ssn'

const ssnValidator = (value, options, key, attributes, globalOptions) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const {
    first, middle, last, notApplicable,
  } = value

  if (notApplicable === true) return null

  const ssnErrors = validateModel(value, ssn, { ...globalOptions, ...options })
  if (ssnErrors !== true) return ssnErrors

  const completeSSN = `${first}-${middle}-${last}`

  // Legacy system only excluded explicit values
  const invalidSSNs = [
    '999-99-9999',
    '123-45-6789',
  ]

  if (invalidSSNs.indexOf(completeSSN) > -1) return 'Invalid SSN'

  return null
}

export default ssnValidator
