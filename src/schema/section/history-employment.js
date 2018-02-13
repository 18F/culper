import * as form from '../form'

export const historyEmployment = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        EmploymentActivity: form.employmentactivity(xitem.EmploymentActivity),
        Dates: form.daterange(xitem.Dates),
        Employment: form.text(xitem.Employment),
        Status: form.radio(xitem.Status),
        Title: form.text(xitem.Title),
        DutyStation: form.text(xitem.DutyStation),
        Address: form.location(xitem.Address),
        Additional: form.collection(((xitem.Additional || {}).items || []).map(y => {
          const yitem = y.Item || {}
          return {
            Item: {
              Has: form.branch(yitem.Has),
              Position: form.text(yitem.Position),
              Supervisor: form.text(yitem.Supervisor),
              DatesEmployed: form.daterange(yitem.DatesEmployed)
            }
          }
        })),
        Telephone: form.telephone(xitem.Telephone),
        PhysicalAddress: form.physicaladdress(xitem.PhysicalAddress),
        ReasonLeft: form.reasonleft(xitem.ReasonLeft),
        Reprimand: form.collection(((xitem.Reprimand || {}).items || []).map(y => {
          const yitem = y.Item || {}
          return {
            Item: {
              Has: form.branch(yitem.Has),
              Text: form.textarea(yitem.Text),
              Date: form.datecontrol(yitem.Date)
            }
          }
        })),
        Supervisor: form.supervisor(xitem.Supervisor),
        ReferenceName: form.name(xitem.ReferenceName),
        ReferencePhone: form.telephone(xitem.ReferencePhone),
        ReferenceAddress: form.location(xitem.ReferenceAddress)
      }
    }
  })
  return {
    EmploymentRecord: form.branch(data.EmploymentRecord),
    List: form.collection(items, (data.List || {}).branch)
  }
}
