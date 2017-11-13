import * as form from '../form'

export const legalTechnologyUnauthorized = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Date: form.datecontrol(xitem.Date),
        Incident: form.textarea(xitem.Incident),
        Location: form.location(xitem.Location),
        Action: form.textarea(xitem.Action)
      }
    }
  })
  return {
    HasUnauthorized: form.branch(data.HasUnauthorized),
    List: form.collection(items, (data.List || {}).branch)
  }
}
