import * as form from '../form'

export const identificationOthernames = (data = {}) => {
  const names = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.name(xitem.Name),
        MaidenName: form.radio(xitem.MaidenName),
        DatesUsed: form.daterange(xitem.DatesUsed),
        Reason: form.textarea(xitem.Reason)
      }
    }
  })
  return {
    HasOtherNames: form.branch(data.HasOtherNames),
    List: form.collection(names, (data.List || {}).branch)
  }
}
