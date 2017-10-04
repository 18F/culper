import * as form from '../form'

export const legalAssociationsAdvocating = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Reasons: form.textarea(x.Item.Reasons),
        Dates: form.daterange(x.Item.Dates)
      }
    }
  })
  return {
    HasAdvocated: form.branch(data.HasAdvocated),
    List: form.collection(items, data.ListBranch)
  }
}
