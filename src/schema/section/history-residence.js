import * as form from '../form'

export const historyResidence = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Dates: form.daterange(xitem.Dates),
        Address: form.location(xitem.Address),
        Comments: form.textarea(xitem.Comments),
        Reference: form.reference(xitem.Reference),
        Role: form.radio(xitem.Role),
        RoleOther: form.text(xitem.RoleOther)
      }
    }
  })
  return {
    List: form.collection(items, (data.List || {}).branch)
  }
}
