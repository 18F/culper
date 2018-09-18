import * as form from '../form'

export const identificationContacts = (data = {}) => {
  const phoneNumbers = ((data.PhoneNumbers || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Telephone: form.telephone(xitem.Telephone)
      }
    }
  })
  return {
    HomeEmail: form.email(data.HomeEmail),
    WorkEmail: form.email(data.WorkEmail),
    PhoneNumbers: form.collection(phoneNumbers)
  }
}
