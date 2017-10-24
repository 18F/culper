import * as form from '../form'

export const legalAssociationsActivitiesToOverthrow = (data = {}) => {
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
    HasActivities: form.branch(data.HasActivities),
    List: form.collection(items, (data.List || {}).branch)
  }
}
