import * as form from '../form'

export const substanceDrugPurchase = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        DrugType: form.radio(xitem.DrugType),
        FirstInvolvement: form.datecontrol(xitem.FirstInvolvement),
        RecentInvolvement: form.datecontrol(xitem.RecentInvolvement),
        NatureOfInvolvement: form.textarea(xitem.NatureOfInvolvement),
        InvolvementWhileEmployed: form.branch(xitem.InvolvementWhileEmployed),
        InvolvementWithClearance: form.branch(xitem.InvolvementWithClearance),
        InvolvementInFuture: form.branch(xitem.InvolvementInFuture),
        Reasons: form.textarea(xitem.Reasons),
        Explanation: form.textarea(xitem.Explanation)
      }
    }
  })
  return {
    Involved: form.branch(data.Involved),
    List: form.collection(items, (data.List || {}).branch)
  }
}
