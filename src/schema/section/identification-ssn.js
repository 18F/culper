import * as form from '../form'

export const identificationSSN = (data = {}) => {
  return {
    date: form.ssn(data)
  }
}
