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
    HomeEmail: form.text(data.HomeEmail),
    WorkEmail: form.text(data.WorkEmail),
    PhoneNumbers: form.collection(phoneNumbers)
  }
}
