import * as form from '../form'

export const foreignActivitiesSupport = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.name(xitem.Name),
        Address: form.location(xitem.Address),
        Relationship: form.textarea(xitem.Relationship),
        Amount: form.number(xitem.Amount),
        AmountEstimated: form.checkbox(xitem.AmountEstimated),
        Frequency: form.text(xitem.Frequency),
        Citizenship: form.country(xitem.Citizenship)
      }
    }
  })
  return {
    HasForeignSupport: form.branch(data.HasForeignSupport),
    List: form.collection(items, (data.List || {}).branch)
  }
}
