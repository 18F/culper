import * as form from '../form'

export const foreignActivitiesDirect = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        InterestTypes: form.checkboxgroup(x.Item.InterestTypes),
        InterestType: form.text(x.Item.InterestType),
        Acquired: form.datecontrol(x.Item.Acquired),
        HowAcquired: form.textarea(x.Item.HowAcquired),
        Cost: form.number(x.Item.Cost),
        CostEstimated: form.checkbox(x.Item.CostEstimated),
        Value: form.number(x.Item.Value),
        ValueEstimated: form.checkbox(x.Item.ValueEstimated),
        Relinquished: form.datecontrol(x.Item.Relinquished),
        RelinquishedNotApplicable: form.notapplicable(x.Item.RelinquishedNotApplicable),
        Explanation: form.textarea(x.Item.Explanation),
        CoOwners: form.coowners(x.Item.CoOwners)
      }
    }
  })
  return {
    HasInterests: form.branch(data.HasInterests),
    List: form.collection(items, data.ListBranch)
  }
}
