import * as form from '../form'

export const legalAssociationsAdvocating = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Reasons: form.textarea(xitem.Reasons),
        Dates: form.daterange(xitem.Dates)
      }
    }
  })
  return {
    HasAdvocated: form.branch(data.HasAdvocated),
    List: form.collection(items, (data.List || {}).branch)
  }
}
