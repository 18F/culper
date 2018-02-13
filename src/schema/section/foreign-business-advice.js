import * as form from '../form'

export const foreignBusinessAdvice = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Description: form.text(xitem.Description),
        Name: form.name(xitem.Name),
        Organization: form.text(xitem.Organization),
        Country: form.country(xitem.Country),
        Dates: form.daterange(xitem.Dates),
        Compensation: form.textarea(xitem.Compensation)
      }
    }
  })
  return {
    HasForeignAdvice: form.branch(data.HasForeignAdvice),
    List: form.collection(items, (data.List || {}).branch)
  }
}
