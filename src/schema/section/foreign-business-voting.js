import * as form from '../form'

export const foreignBusinessVoting = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Date: form.datecontrol(x.Item.Date),
        Country: form.country(x.Item.Country),
        Reason: form.textarea(x.Item.Reason),
        Eligibility: form.text(x.Item.Eligibility)
      }
    }
  })
  return {
    HasForeignVoting: form.branch(data.HasForeignVoting),
    List: form.collection(items, data.ListBranch)
  }
}
