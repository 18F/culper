import * as form from '../form'

export const foreignBusinessAdvice = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Name: form.name(x.Item.Name),
        Organization: form.text(x.Item.Organization),
        Country: form.country(x.Item.Country),
        Dates: form.daterange(x.Item.Dates),
        Compensation: form.textarea(x.Item.Compensation)
      }
    }
  })
  return {
    HasForeignAdvice: form.branch(data.HasForeignAdvice),
    List: form.collection(items, data.ListBranch)
  }
}
