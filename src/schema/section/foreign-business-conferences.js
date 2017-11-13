import * as form from '../form'

export const foreignBusinessConferences = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Description: form.textarea(xitem.Description),
        Sponsor: form.text(xitem.Sponsor),
        City: form.text(xitem.City),
        Country: form.country(xitem.Country),
        Dates: form.daterange(xitem.Dates),
        Purpose: form.textarea(xitem.Purpose),
        Contacts: form.contacts(xitem.Contacts)
      }
    }
  })
  return {
    HasForeignConferences: form.branch(data.HasForeignConferences),
    List: form.collection(items, (data.List || {}).branch)
  }
}
