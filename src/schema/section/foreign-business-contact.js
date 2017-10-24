import * as form from '../form'

export const foreignBusinessContact = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.name(xitem.Name),
        Location: form.location(xitem.Location),
        Date: form.datecontrol(xitem.Date),
        Governments: form.country(xitem.Governments),
        Establishment: form.textarea(xitem.Establishment),
        Representatives: form.textarea(xitem.Representatives),
        Purpose: form.textarea(xitem.Purpose),
        SubsequentContacts: form.contacts(xitem.SubsequentContacts)
      }
    }
  })
  return {
    HasForeignContact: form.branch(data.HasForeignContact),
    List: form.collection(items, (data.List || {}).branch)
  }
}
