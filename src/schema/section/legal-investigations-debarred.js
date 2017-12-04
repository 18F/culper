import * as form from '../form'

export const legalInvestigationsDebarred = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Agency: form.text(xitem.Agency),
        Date: form.datecontrol(xitem.Date),
        Explanation: form.textarea(xitem.Explanation)
      }
    }
  })
  return {
    HasDebarment: form.branch(data.HasDebarment),
    List: form.collection(items, (data.List || {}).branch)
  }
}
