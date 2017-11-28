import * as form from '../form'

export const foreignBusinessVentures = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.name(xitem.Name),
        Address: form.location(xitem.Address),
        Citizenship: form.country(xitem.Citizenship),
        Description: form.textarea(xitem.Description),
        Relationship: form.textarea(xitem.Relationship),
        Dates: form.daterange(xitem.Dates),
        Association: form.textarea(xitem.Association),
        Position: form.text(xitem.Position),
        Service: form.text(xitem.Service),
        Support: form.text(xitem.Support),
        Compensation: form.textarea(xitem.Compensation)
      }
    }
  })
  return {
    HasForeignVentures: form.branch(data.HasForeignVentures),
    List: form.collection(items, (data.List || {}).branch)
  }
}
