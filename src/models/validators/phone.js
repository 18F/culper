import { validateModel } from 'models/validate'
import phone from 'models/shared/phone'

const phoneValidator = (value = {}) => {
  const { Telephone } = value

  const phoneErrors = validateModel(Telephone, phone)

  if (phoneErrors !== true) return phoneErrors

  return null
}

export default phoneValidator
