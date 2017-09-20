import * as form from '../form'

export const identificationContacts = (data = {}) => {
  return {
    Emails: form.collection(data.Emails),
    PhoneNumbers: form.collection(data.PhoneNumbers)
  }
}
