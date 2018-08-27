import * as form from '../form'

export const foreignActivitiesDirect = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        InterestTypes: form.checkboxgroup(xitem.InterestTypes),
        InterestType: form.text(xitem.InterestType),
        Acquired: form.datecontrol(xitem.Acquired),
        HowAcquired: form.textarea(xitem.HowAcquired),
        Cost: form.number(xitem.Cost),
        CostEstimated: form.checkbox(xitem.CostEstimated),
        Value: form.number(xitem.Value),
        ValueEstimated: form.checkbox(xitem.ValueEstimated),
        Relinquished: form.datecontrol(xitem.Relinquished),
        RelinquishedNotApplicable: form.notapplicable(
          xitem.RelinquishedNotApplicable
        ),
        Explanation: form.textarea(xitem.Explanation),
        CoOwners: form.coowners(xitem.CoOwners)
      }
    }
  })
  return {
    HasInterests: form.branch(data.HasInterests),
    List: form.collection(items, (data.List || {}).branch)
  }
}
