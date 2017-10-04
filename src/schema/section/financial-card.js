import * as form from '../form'

export const financialCard = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Agency: form.text(x.Item.Agency),
        Address: form.location(x.Item.Address),
        Date: form.datecontrol(x.Item.Date),
        Reason: form.textarea(x.Item.Reason),
        Amount: form.number(x.Item.Amount),
        AmountEstimated: form.checkbox(x.Item.AmountEstimated),
        Description: form.textarea(x.Item.Description)
      }
    }
  })
  return {
    HasCardAbuse: form.branch(data.HasCardAbuse),
    List: form.collection(items, data.ListBranch)
  }
}
