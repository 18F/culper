import * as form from '../form'

export const foreignActivitiesSupport = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Name: form.name(x.Item.Name),
        Address: form.location(x.Item.Address),
        Relationship: form.textarea(x.Item.Relationship),
        Amount: form.number(x.Item.Amount),
        AmountEstimated: form.checkbox(x.Item.AmountEstimated),
        Frequency: form.text(x.Item.Frequency),
        Citizenship: form.country(x.Item.Citizenship)
      }
    }
  })
  return {
    HasForeignSupport: form.branch(data.HasForeignSupport),
    List: form.collection(items, data.ListBranch)
  }
}
