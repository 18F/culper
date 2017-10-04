import * as form from '../form'

export const financialGambling = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Losses: form.number(x.Item.Losses),
        Description: form.textarea(x.Item.Description),
        Actions: form.textarea(x.Item.Actions),
        Dates: form.daterange(x.Item.Dates)
      }
    }
  })
  return {
    HasGamblingDebt: form.branch(data.HasGamblingDebt),
    List: form.collection(items, data.ListBranch)
  }
}
