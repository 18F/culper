import * as form from '../form'

export const foreignBusinessContact = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Name: form.name(x.Item.Name),
        Location: form.location(x.Item.Location),
        Date: form.datecontrol(x.Item.Date),
        Governments: form.country(x.Item.Governments),
        Establishment: form.textarea(x.Item.Establishment),
        Representatives: form.textarea(x.Item.Representatives),
        Purpose: form.textarea(x.Item.Purpose),
        SubsequentContacts: form.contacts(x.Item.SubsequentContacts)
      }
    }
  })
  return {
    HasForeignContact: form.branch(data.HasForeignContact),
    List: form.collection(items, data.ListBranch)
  }
}
