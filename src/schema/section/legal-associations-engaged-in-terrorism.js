import * as form from '../form'

export const legalAssociationsEngagedInTerrorism = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Reasons: form.textarea(x.Item.Reasons),
        Dates: form.daterange(x.Item.Dates)
      }
    }
  })
  return {
    HasEngaged: form.branch(data.HasEngaged),
    List: form.collection(items, data.ListBranch)
  }
}
