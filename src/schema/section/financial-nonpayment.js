import * as form from '../form'

export const financialNonpayment = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Name: form.text(x.Item.Name),
        Infractions: form.checkboxgroup(x.Item.Infractions),
        AccountNumber: form.text(x.Item.AccountNumber),
        PropertyType: form.text(x.Item.PropertyType),
        Amount: form.number(x.Item.Amount),
        AmountEstimated: form.checkbox(x.Item.AmountEstimated),
        Reason: form.textarea(x.Item.Reason),
        Status: form.text(x.Item.Status),
        Date: form.datecontrol(x.Item.Date),
        Resolved: form.datecontrol(x.Item.Resolved),
        ResolvedNotApplicable: form.notapplicable(x.Item.ResolvedNotApplicable),
        Description: form.textarea(x.Item.Description)
      }
    }
  })
  return {
    HasNonpayment: form.branch(data.HasNonpayment),
    List: form.collection(items, data.ListBranch)
  }
}
