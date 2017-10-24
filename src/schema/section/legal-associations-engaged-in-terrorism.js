import * as form from '../form'

export const legalAssociationsEngagedInTerrorism = (data = {}) => {
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
    HasEngaged: form.branch(data.HasEngaged),
    List: form.collection(items, (data.List || {}).branch)
  }
}
