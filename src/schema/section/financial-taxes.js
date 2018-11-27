import * as form from '../form'

export const financialTaxes = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Failure: form.radio(xitem.Failure),
        Year: form.datecontrol(xitem.Year),
        YearEstimated: form.checkbox(xitem.YearEstimated),
        Reason: form.textarea(xitem.Reason),
        Agency: form.text(xitem.Agency),
        TaxType: form.text(xitem.TaxType),
        Amount: form.number(xitem.Amount),
        AmountEstimated: form.checkbox(xitem.AmountEstimated),
        Date: form.datecontrol(xitem.Date),
        DateNotApplicable: form.notapplicable(xitem.DateNotApplicable),
        Description: form.textarea(xitem.Description)
      }
    }
  })
  return {
    HasTaxes: form.branch(data.HasTaxes),
    List: form.collection(items, (data.List || {}).branch)
  }
}
