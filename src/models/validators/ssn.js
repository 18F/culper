import { validateModel } from 'models/validate'
import ssn from 'models/shared/ssn'

const ssnValidator = (value) => {
  const {
    first, middle, last, notApplicable,
  } = value

  if (notApplicable) return null

  const ssnErrors = validateModel(value, ssn)
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
