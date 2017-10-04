import * as form from '../form'

export const legalTechnologyUnauthorized = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Date: form.datecontrol(x.Item.Date),
        Incident: form.textarea(x.Item.Incident),
        Location: form.location(x.Item.Location),
        Action: form.textarea(x.Item.Action)
      }
    }
  })
  return {
    HasUnauthorized: form.branch(data.HasUnauthorized),
    List: form.collection(items, data.ListBranch)
  }
}
