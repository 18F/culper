import * as form from '../form'

export const citizenshipPassports = (data = {}) => {
  return {
    Passports: form.collection(data.Passports)
  }
}
