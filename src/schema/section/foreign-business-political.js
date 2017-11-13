import * as form from '../form'

export const foreignBusinessPolitical = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Position: form.text(xitem.Position),
        Dates: form.daterange(xitem.Dates),
        Country: form.country(xitem.Country),
        Reason: form.textarea(xitem.Reason),
        Eligibility: form.textarea(xitem.Eligibility)
      }
    }
  })
  return {
    HasForeignPolitical: form.branch(data.HasForeignPolitical),
    List: form.collection(items, (data.List || {}).branch)
  }
}
