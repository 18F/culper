import * as form from '../form'

export const financialTaxes = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Failure: form.radio(x.Item.Failure),
        Year: form.number(x.Item.Year),
        YearEstimated: form.checkbox(x.Item.YearEstimated),
        Reason: form.textarea(x.Item.Reason),
        Agency: form.text(x.Item.Agency),
        TaxType: form.text(x.Item.TaxType),
        Amount: form.number(x.Item.Amount),
        AmountEstimated: form.checkbox(x.Item.AmountEstimated),
        Date: form.datecontrol(x.Item.Date),
        DateNotApplicable: form.notapplicable(x.Item.DateNotApplicable),
        Description: form.textarea(x.Item.Description)
      }
    }
  })
  return {
    HasTaxes: form.branch(data.HasTaxes),
    List: form.collection(items, data.ListBranch)
  }
}
