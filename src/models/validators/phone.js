import { validateModel } from 'models/validate'
import phone from 'models/shared/phone'

const phoneValidator = (value) => {
  const phoneErrors = validateModel(value, phone)

  if (phoneErrors !== true) return phoneErrors

  return null
}

export default phoneValidator
