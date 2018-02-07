import * as form from '../form'

export const substanceDrugUsage = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        DrugType: form.radio(xitem.DrugType),
        FirstUse: form.datecontrol(xitem.FirstUse),
        RecentUse: form.datecontrol(xitem.RecentUse),
        NatureOfUse: form.textarea(xitem.NatureOfUse),
        UseWhileEmployed: form.branch(xitem.UseWhileEmployed),
        UseWithClearance: form.branch(xitem.UseWithClearance),
        UseInFuture: form.branch(xitem.UseInFuture),
        Explanation: form.textarea(xitem.Explanation)
      }
    }
  })
  return {
    UsedDrugs: form.branch(data.UsedDrugs),
    List: form.collection(items, (data.List || {}).branch)
  }
}
