import * as form from '../form'

export const substanceAlcoholNegative = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Occurred: form.datecontrol(x.Item.Occurred),
        Circumstances: form.textarea(x.Item.Circumstances),
        NegativeImpact: form.textarea(x.Item.NegativeImpact),
        Used: form.daterange(x.Item.Used)
      }
    }
  })
  return {
    HasImpacts: form.branch(data.HasImpacts),
    List: form.collection(items, data.ListBranch)
  }
}
