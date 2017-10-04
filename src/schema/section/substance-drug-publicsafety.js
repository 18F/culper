import * as form from '../form'

export const substanceDrugPublicSafety = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Description: form.textarea(x.Item.Description),
        InvolvementDates: form.daterange(x.Item.InvolvementDates),
        EstimatedUse: form.text(x.Item.EstimatedUse)
      }
    }
  })
  return {
    UsedDrugs: form.branch(data.UsedDrugs),
    List: form.collection(items, data.ListBranch)
  }
}
