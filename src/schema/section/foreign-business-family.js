import * as form from '../form'

export const foreignBusinessFamily = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Name: form.name(x.Item.Name),
        Agency: form.text(x.Item.Agency),
        Country: form.country(x.Item.Country),
        Date: form.datecontrol(x.Item.Date),
        Circumstance: form.textarea(x.Item.Circumstance)
      }
    }
  })
  return {
    HasForeignFamily: form.branch(data.HasForeignFamily),
    List: form.collection(items, data.ListBranch)
  }
}
