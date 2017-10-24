import * as form from '../form'

export const foreignActivitiesRealestate = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        InterestTypes: form.checkboxgroup(xitem.InterestTypes),
        RealEstateType: form.text(xitem.RealEstateType),
        Address: form.location(xitem.Address),
        Acquired: form.datecontrol(xitem.Acquired),
        HowAcquired: form.textarea(xitem.HowAcquired),
        Cost: form.number(xitem.Cost),
        CostEstimated: form.checkbox(xitem.CostEstimated),
        Sold: form.datecontrol(xitem.Sold),
        SoldNotApplicable: form.notapplicable(xitem.SoldNotApplicable),
        Value: form.number(xitem.Value),
        ValueEstimated: form.checkbox(xitem.ValueEstimated),
        CoOwners: form.coowners(xitem.CoOwners)
      }
    }
  })
  return {
    HasInterests: form.branch(data.HasInterests),
    List: form.collection(items, (data.List || {}).branch)
  }
}
