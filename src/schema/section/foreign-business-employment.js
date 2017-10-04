import * as form from '../form'

export const foreignBusinessEmployment = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Name: form.name(x.Item.Name),
        Description: form.textarea(x.Item.Description),
        Date: form.datecontrol(x.Item.Date),
        Address: form.location(x.Item.Address),
        Accepted: form.branch(x.Item.Accepted),
        Explanation: form.textarea(x.Item.Explanation)
      }
    }
  })
  return {
    HasForeignEmployment: form.branch(data.HasForeignEmployment),
    List: form.collection(items, data.ListBranch)
  }
}
