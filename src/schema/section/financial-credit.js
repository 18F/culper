import * as form from '../form'

export const financialCredit = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Explanation: form.textarea(x.Item.Explanation),
        Name: form.text(x.Item.Name),
        Telephone: form.telephone(x.Item.Telephone),
        Location: form.location(x.Item.Location),
        Description: form.textarea(x.Item.Description)
      }
    }
  })
  return {
    HasCreditCounseling: form.branch(data.HasCreditCounseling),
    List: form.collection(items, data.ListBranch)
  }
}
