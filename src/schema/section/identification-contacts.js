import * as form from '../form'

export const identificationContacts = (data = {}) => {
  const emails = ((data.Emails || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Email: form.email(xitem.Email)
      }
    }
  })
  const phoneNumbers = ((data.PhoneNumbers || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Telephone: form.telephone(xitem.Telephone)
      }
    }
  })
  return {
    Emails: form.collection(emails),
    PhoneNumbers: form.collection(phoneNumbers)
  }
}
