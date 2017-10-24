import * as form from '../form'

export const foreignBusinessEmployment = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.name(xitem.Name),
        Description: form.textarea(xitem.Description),
        Date: form.datecontrol(xitem.Date),
        Address: form.location(xitem.Address),
        Accepted: form.branch(xitem.Accepted),
        Explanation: form.textarea(xitem.Explanation)
      }
    }
  })
  return {
    HasForeignEmployment: form.branch(data.HasForeignEmployment),
    List: form.collection(items, (data.List || {}).branch)
  }
}
