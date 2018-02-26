import * as form from '../form'

export const substanceDrugMisuse = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        PrescriptionName: form.text(xitem.PrescriptionName),
        InvolvementDates: form.daterange(xitem.InvolvementDates),
        Reason: form.textarea(xitem.Reason),
        UseWhileEmployed: form.branch(xitem.UseWhileEmployed),
        UseWithClearance: form.branch(xitem.UseWithClearance)
      }
    }
  })
  return {
    MisusedDrugs: form.branch(data.MisusedDrugs),
    List: form.collection(items, (data.List || {}).branch)
  }
}
