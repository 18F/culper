import * as form from '../form'

export const foreignBusinessVoting = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Date: form.datecontrol(xitem.Date),
        Country: form.country(xitem.Country),
        Reason: form.textarea(xitem.Reason),
        Eligibility: form.text(xitem.Eligibility)
      }
    }
  })
  return {
    HasForeignVoting: form.branch(data.HasForeignVoting),
    List: form.collection(items, (data.List || {}).branch)
  }
}
