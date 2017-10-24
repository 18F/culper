import * as form from '../form'

export const legalTechnologyManipulating = (data = {}) => {
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
    HasManipulating: form.branch(data.HasManipulating),
    List: form.collection(items, (data.List || {}).branch)
  }
}
