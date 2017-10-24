import * as form from '../form'

export const financialNonpayment = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.text(xitem.Name),
        Infractions: form.checkboxgroup(xitem.Infractions),
        AccountNumber: form.text(xitem.AccountNumber),
        PropertyType: form.text(xitem.PropertyType),
        Amount: form.number(xitem.Amount),
        AmountEstimated: form.checkbox(xitem.AmountEstimated),
        Reason: form.textarea(xitem.Reason),
        Status: form.text(xitem.Status),
        Date: form.datecontrol(xitem.Date),
        Resolved: form.datecontrol(xitem.Resolved),
        ResolvedNotApplicable: form.notapplicable(xitem.ResolvedNotApplicable),
        Description: form.textarea(xitem.Description)
      }
    }
  })
  return {
    HasNonpayment: form.branch(data.HasNonpayment),
    List: form.collection(items, (data.List || {}).branch)
  }
}
