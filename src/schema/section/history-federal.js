import * as form from '../form'

export const historyFederal = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Dates: form.daterange(xitem.Dates),
        Name: form.text(xitem.Name),
        Position: form.text(xitem.Position),
        Address: form.location(xitem.Address)
      }
    }
  })
  return {
    HasFederalService: form.branch(data.HasFederalService),
    List: form.collection(items, (data.List || {}).branch)
  }
}
