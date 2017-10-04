import * as form from '../form'

export const legalInvestigationsRevoked = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Agency: form.text(x.Item.Agency),
        Date: form.datecontrol(x.Item.Date),
        Explanation: form.textarea(x.Item.Explanation)
      }
    }
  })
  return {
    HasRevocations: form.branch(data.HasRevocations),
    List: form.collection(items, data.ListBranch)
  }
}
