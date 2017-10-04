import * as form from '../form'

export const substanceDrugPurchase = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        DrugType: form.checkbox(x.Item.DrugType),
        FirstInvolvement: form.datecontrol(x.Item.FirstInvolvement),
        RecentInvolvement: form.datecontrol(x.Item.RecentInvolvement),
        NatureOfInvolvement: form.textarea(x.Item.NatureOfInvolvement),
        InvolvementWhileEmployed: form.branch(x.Item.InvolvementWhileEmployed),
        InvolvementWithClearance: form.branch(x.Item.InvolvementWithClearance),
        InvolvementInFuture: form.branch(x.Item.InvolvementInFuture),
        Reasons: form.textarea(x.Item.Reasons),
        Explanation: form.textarea(x.Item.Explanation)
      }
    }
  })
  return {
    Involved: form.branch(data.Involved),
    List: form.collection(items, data.ListBranch)
  }
}
