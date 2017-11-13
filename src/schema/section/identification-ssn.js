import * as form from '../form'

export const identificationSSN = (data = {}) => {
  return {
    ssn: form.ssn(data.ssn),
    verified: data.verified
  }
}
