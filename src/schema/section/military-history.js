import * as form from '../form'

export const militaryHistory = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Service: form.radio(xitem.Service),
        Status: form.radio(xitem.Status),
        Officer: form.radio(xitem.Officer),
        ServiceNumber: form.text(xitem.ServiceNumber),
        Dates: form.daterange(xitem.Dates),
        ServiceState: form.location(xitem.ServiceNumber),
        HasBeenDischarged: form.branch(xitem.HasBeenDischarged),
        DischargeType: form.radio(xitem.DischargeType),
        DischargeTypeOther: form.text(xitem.DischargeTypeOther),
        DischargeReason: form.textarea(xitem.DischargeReason),
        DischargeDate: form.datecontrol(xitem.DischargeDate)
      }
    }
  })
  return {
    HasServed: form.branch(data.HasServed),
    List: form.collection(items, (data.List || {}).branch)
  }
}
