import * as form from '../form'

export const financialCredit = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Explanation: form.textarea(xitem.Explanation),
        Name: form.text(xitem.Name),
        Telephone: form.telephone(xitem.Telephone),
        Location: form.location(xitem.Location),
        Description: form.textarea(xitem.Description)
      }
    }
  })
  return {
    HasCreditCounseling: form.branch(data.HasCreditCounseling),
    List: form.collection(items, (data.List || {}).branch)
  }
}
