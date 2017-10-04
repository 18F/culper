import * as form from '../form'

export const historyFederal = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Dates: form.daterange(x.Item.Dates),
        Name: form.text(x.Item.Name),
        Position: form.text(x.Item.Position),
        Address: form.location(x.Item.Address)
      }
    }
  })
  return {
    HasFederalService: form.branch(data.HasFederalService),
    List: form.collection(items, data.ListBranch)
  }
}
