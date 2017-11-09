import * as form from '../form'

export const citizenshipMultiple = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Country: form.country(xitem.Country),
        Dates: form.daterange(xitem.Dates),
        How: form.textarea(xitem.How),
        Renounced: form.branch(xitem.Renounced),
        RenouncedExplanation: form.textarea(xitem.RenouncedExplanation),
        Current: form.branch(xitem.Current),
        CurrentExplanation: form.textarea(xitem.CurrentExplanation)
      }
    }
  })
  return {
    HasMultiple: form.branch(data.HasMultiple),
    List: form.collection(items, (data.List || {}).branch)
  }
}
