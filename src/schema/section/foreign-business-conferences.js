import * as form from '../form'

export const foreignBusinessConferences = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Description: form.textarea(x.Item.Description),
        Sponsor: form.text(x.Item.Sponsor),
        City: form.text(x.Item.City),
        Country: form.country(x.Item.Country),
        Dates: form.daterange(x.Item.Dates),
        Purpose: form.textarea(x.Item.Purpose),
        Contacts: form.contacts(x.Item.Contacts)
      }
    }
  })
  return {
    HasForeignConferences: form.branch(data.HasForeignConferences),
    List: form.collection(items, data.ListBranch)
  }
}
