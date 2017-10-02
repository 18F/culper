import * as form from '../form'

export const identificationContacts = (data = {}) => {
  const emails = data.Emails.map(x => {
    return {
      Item: {
        Email: form.email(x.Item)
      }
    }
  })
  const phoneNumbers = data.PhoneNumbers.map(x => {
    return {
      Item: {
        PhoneNumber: form.telephone(x.Item)
      }
    }
  })
  return {
    Emails: form.collection(emails),
    PhoneNumbers: form.collection(phoneNumbers)
  }
}
