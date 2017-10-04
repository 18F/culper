import * as form from '../form'

export const historyEmployment = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        EmploymentActivity: form.employmentactivity(x.Item.EmploymentActivity),
        Dates: form.daterange(x.Item.Dates),
        Employment: form.text(x.Item.Employment),
        Status: form.radio(x.Item.Status),
        Title: form.text(x.Item.Title),
        DutyStation: form.text(x.Item.DutyStation),
        Address: form.location(x.Item.Address),
        Additional: form.collection((x.Item.Additional || []).map(y => {
          return {
            Item: {
              Position: form.text(y.Item.Position),
              Supervisor: form.text(y.Item.Supervisor),
              DatesEmployed: form.daterange(y.Item.DatesEmployed)
            }
          }
        })),
        Telephone: form.telephone(x.Item.Telephone),
        PhysicalAddress: form.physicaladdress(x.Item.PhysicalAddress),
        ReasonLeft: form.reasonleft(x.Item.ReasonLeft),
        Reprimand: form.collection((x.Item.Reprimand || []).map(y => {
          return {
            Item: {
              Text: form.textarea(y.Item.Text),
              Date: form.datecontrol(y.Item.Date)
            }
          }
        })),
        Supervisor: form.supervisor(x.Item.Supervisor),
        Reference: form.reference(x.Item.Reference)
      }
    }
  })
  return {
    List: form.collection(data.List, data.ListBranch)
  }
}
