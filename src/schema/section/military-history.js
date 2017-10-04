import * as form from '../form'

export const militaryHistory = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Service: form.radio(x.Item.Service),
        Status: form.radio(x.Item.Status),
        Officer: form.radio(x.Item.Officer),
        ServiceNumber: form.text(x.Item.ServiceNumber),
        Dates: form.daterange(x.Item.Dates),
        HasBeenDischarged: form.branch(x.Item.HasBeenDischarged),
        DischargeType: form.radio(x.Item.DischargeType),
        DischargeTypeOther: form.text(x.Item.DischargeTypeOther),
        DischargeReason: form.textarea(x.Item.DischargeReason),
        DischargeDate: form.datecontrol(x.Item.DischargeDate)
      }
    }
  })
  return {
    HasServed: form.branch(data.HasServed),
    List: form.collection(items, data.ListBranch)
  }
}
