import * as form from '../form'

export const substanceDrugMisuse = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        PrescriptionName: form.text(x.Item.PrescriptionName),
        InvolvementDates: form.daterange(x.Item.InvolvementDates),
        Reason: form.textarea(x.Item.Reason),
        UseWhileEmployed: form.branch(x.Item.UseWhileEmployed),
        UseWithClearance: form.branch(x.Item.UseWithClearance)
      }
    }
  })
  return {
    UsedDrugs: form.branch(data.UsedDrugs),
    List: form.collection(items, data.ListBranch)
  }
}
