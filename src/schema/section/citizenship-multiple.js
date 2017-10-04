import * as form from '../form'

export const citizenshipMultiple = (data = {}) => {
  const items = (data.Citizenships || []).map(x => {
    return {
      Item: {
        Country: form.country(x.Item.Country),
        Dates: form.daterange(x.Item.Dates),
        How: form.textarea(x.Item.How),
        Renounced: form.branch(x.Item.Renounced),
        RenouncedExplanation: form.textarea(x.Item.RenouncedExplanation),
        Current: form.branch(x.Item.Current),
        CurrentExplanation: form.textarea(x.Item.CurrentExplanation)
      }
    }
  })
  return {
    HasMultiple: form.branch(data.HasMultiple),
    List: form.collection(items, data.CitizenshipsBranch)
  }
}
