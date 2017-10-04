import * as form from '../form'

export const militaryForeign = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Organization: form.radio(x.Item.Organization),
        Name: form.text(x.Item.Name),
        Dates: form.daterange(x.Item.Dates),
        Country: form.country(x.Item.Country),
        Rank: form.text(x.Item.Rank),
        Division: form.text(x.Item.Division),
        Circumstances: form.textarea(x.Item.Circumstances),
        ReasonLeft: form.textarea(x.Item.ReasonLeft),
        MaintainsContact: form.branch(x.Item.MaintainsContact),
        List: form.collection((x.Item.List || []).map(y => {
          return {
            Item: {
              Name: form.name(y.Item.Name),
              Address: form.location(y.Item.Address),
              Title: form.text(y.Item.Title),
              Dates: form.daterange(y.Item.Dates),
              Frequency: form.text(y.Item.Frequency)
            }
          }
        }))
      }
    }
  })
  return {
    List: form.collection(items)
  }
}
