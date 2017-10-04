import * as form from '../form'

export const foreignBusinessVentures = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Name: form.name(x.Item.Name),
        Address: form.location(x.Item.Address),
        Citizenship: form.country(x.Item.Citizenship),
        Description: form.textarea(x.Item.Description),
        Relationship: form.textarea(x.Item.Relationship),
        Dates: form.daterange(x.Item.Dates),
        Association: form.textarea(x.Item.Association),
        Position: form.text(x.Item.Position),
        Service: form.text(x.Item.Service),
        Support: form.text(x.Item.Support),
        Compensation: form.textarea(x.Item.Compensation)
      }
    }
  })
  return {
    HasForeignVentures: form.branch(data.HasForeignVentures),
    List: form.collection(items, data.ListBranch)
  }
}
