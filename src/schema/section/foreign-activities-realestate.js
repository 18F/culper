import * as form from '../form'

export const foreignActivitiesRealestate = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        InterestTypes: form.checkboxgroup(x.Item.InterestTypes),
        RealEstateType: form.text(x.Item.RealEstateType),
        Address: form.location(x.Item.Address),
        Acquired: form.datecontrol(x.Item.Acquired),
        HowAcquired: form.textarea(x.Item.HowAcquired),
        Cost: form.number(x.Item.Cost),
        CostEstimated: form.checkbox(x.Item.CostEstimated),
        Sold: form.datecontrol(x.Item.Sold),
        SoldNotApplicable: form.notapplicable(x.Item.SoldNotApplicable),
        Value: form.number(x.Item.Value),
        ValueEstimated: form.checkbox(x.Item.ValueEstimated),
        CoOwners: form.coowners(x.Item.CoOwners)
      }
    }
  })
  return {
    HasInterests: form.branch(data.HasInterests),
    List: form.collection(items, data.ListBranch)
  }
}
