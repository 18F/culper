import * as form from '../form'

export const financialGambling = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Losses: form.number(xitem.Losses),
        Description: form.textarea(xitem.Description),
        Actions: form.textarea(xitem.Actions),
        Dates: form.daterange(xitem.Dates)
      }
    }
  })
  return {
    HasGamblingDebt: form.branch(data.HasGamblingDebt),
    List: form.collection(items, (data.List || {}).branch)
  }
}
