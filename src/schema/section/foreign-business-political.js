import * as form from '../form'

export const foreignBusinessPolitical = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Position: form.text(x.Item.Position),
        Dates: form.daterange(x.Item.Dates),
        Country: form.country(x.Item.Country),
        Reason: form.textarea(x.Item.Reason),
        Eligibility: form.textarea(x.Item.Eligibility)
      }
    }
  })
  return {
    HasForeignPolitical: form.branch(data.HasForeignPolitical),
    List: form.collection(items, data.ListBranch)
  }
}
