import * as form from '../form'

export const financialCard = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Agency: form.text(xitem.Agency),
        Address: form.location(xitem.Address),
        Date: form.datecontrol(xitem.Date),
        Reason: form.textarea(xitem.Reason),
        Amount: form.number(xitem.Amount),
        AmountEstimated: form.checkbox(xitem.AmountEstimated),
        Description: form.textarea(xitem.Description)
      }
    }
  })
  return {
    HasCardAbuse: form.branch(data.HasCardAbuse),
    List: form.collection(items, (data.List || {}).branch)
  }
}
