import * as form from '../form'

export const financialDelinquent = (data = {}) => {
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
        CourtName: form.text(x.Item.CourtName),
        CourtAddress: form.location(x.Item.CourtAddress),
        Description: form.textarea(x.Item.Description)
      }
    }
  })
  return {
    HasDelinquent: form.branch(data.HasDelinquent),
    List: form.collection(items, data.ListBranch)
  }
}
