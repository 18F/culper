import * as form from '../form'

export const historyEducation = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Dates: form.daterange(xitem.Dates),
        Type: form.radio(xitem.Type),
        Name: form.name(xitem.Name),
        Address: form.location(xitem.Address),
        Comments: form.textarea(xitem.Comments),
        Reference: form.reference(xitem.Reference),
        Diplomas: form.collection(((xitem.Diplomas || {}).items || []).map(y => {
          const yitem = y.Item || {}
          return {
            Item: {
              Has: form.branch(yitem.Has),
              Diploma: form.radio(yitem.Diploma),
              DiplomaOther: form.text(yitem.DiplomaOther),
              Date: form.datecontrol(yitem.Date)
            }
          }
        }))
      }
    }
  })
  return {
    HasAttended: form.branch(data.HasAttended),
    HasDegree10: form.branch(data.HasDegree10),
    List: form.collection(items, (data.List || {}).branch)
  }
}
