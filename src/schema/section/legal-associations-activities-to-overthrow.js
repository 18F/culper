import * as form from '../form'

export const legalAssociationsActivitiesToOverthrow = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Reasons: form.textarea(x.Item.Reasons),
        Dates: form.daterange(x.Item.Dates)
      }
    }
  })
  return {
    HasActivities: form.branch(data.HasActivities),
    List: form.collection(items, data.ListBranch)
  }
}
