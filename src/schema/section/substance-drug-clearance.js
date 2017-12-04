import * as form from '../form'

export const substanceDrugClearance = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Description: form.textarea(xitem.Description),
        InvolvementDates: form.daterange(xitem.InvolvementDates),
        EstimatedUse: form.text(xitem.EstimatedUse)
      }
    }
  })
  return {
    UsedDrugs: form.branch(data.UsedDrugs),
    List: form.collection(items, (data.List || {}).branch)
  }
}
