import * as form from '../form'

export const substanceDrugUsage = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        DrugType: form.checkbox(x.Item.DrugType),
        FirstUse: form.datecontrol(x.Item.FirstUse),
        RecentUse: form.datecontrol(x.Item.RecentUse),
        NatureOfUse: form.textarea(x.Item.NatureOfUse),
        UseWhileEmployed: form.branch(x.Item.UseWhileEmployed),
        UseWithClearance: form.branch(x.Item.UseWithClearance),
        UseInFuture: form.branch(x.Item.UseInFuture),
        Explanation: form.textarea(x.Item.Explanation)
      }
    }
  })
  return {
    UsedDrugs: form.branch(data.UsedDrugs),
    List: form.collection(items, data.ListBranch)
  }
}
