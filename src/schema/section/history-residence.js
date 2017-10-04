import * as form from '../form'

export const historyResidence = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Dates: form.daterange(x.Item.Dates),
        Address: form.location(x.Item.Address),
        Comments: form.textarea(x.Item.Comments),
        Reference: form.reference(x.Item.Reference),
        Role: form.radio(x.Item.Role),
        RoleOther: form.text(x.Item.RoleOther)
      }
    }
  })
  return {
    List: form.collection(items, data.ListBranch)
  }
}
