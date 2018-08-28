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
        SubsequentContacts: form.collection(
          ((xitem.SubsequentContacts || {}).items || []).map(y => {
            const yitem = y.Item || {}
            return {
              Item: {
                Has: form.branch(yitem.Has),
                Subsequent: form.text(yitem.Subsequent),
                Recent: form.datecontrol(yitem.Recent),
                Future: form.text(yitem.Future)
              }
            }
          })
        )
      }
    }
  })
  return {
    HasForeignContact: form.branch(data.HasForeignContact),
    List: form.collection(items, (data.List || {}).branch)
  }
}
