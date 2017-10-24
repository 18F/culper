import * as form from '../form'

export const substanceAlcoholNegative = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Occurred: form.datecontrol(xitem.Occurred),
        Circumstances: form.textarea(xitem.Circumstances),
        NegativeImpact: form.textarea(xitem.NegativeImpact),
        Used: form.daterange(xitem.Used)
      }
    }
  })
  return {
    HasImpacts: form.branch(data.HasImpacts),
    List: form.collection(items, (data.List || {}).branch)
  }
}
