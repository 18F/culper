import * as form from '../form'

export const foreignBusinessFamily = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.name(xitem.Name),
        Agency: form.text(xitem.Agency),
        Country: form.country(xitem.Country),
        Date: form.datecontrol(xitem.Date),
        Circumstances: form.textarea(xitem.Circumstances)
      }
    }
  })
  return {
    HasForeignFamily: form.branch(data.HasForeignFamily),
    List: form.collection(items, (data.List || {}).branch)
  }
}
