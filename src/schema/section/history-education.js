import * as form from '../form'

export const historyEducation = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Dates: form.daterange(xitem.Dates),
        Type: form.radio(xitem.Type),
        Name: form.text(xitem.Name),
        Address: form.location(xitem.Address),
        Comments: form.textarea(xitem.Comments),
        ReferenceName: form.name(xitem.ReferenceName),
        ReferenceNameNotApplicable: form.notapplicable(xitem.ReferenceNameNotApplicable),
        ReferencePhone: form.telephone(xitem.ReferencePhone),
        ReferenceEmailNotApplicable: form.notapplicable(xitem.ReferenceEmailNotApplicable),
        ReferenceEmail: form.email(xitem.ReferenceEmail),
        ReferenceAddress: form.location(xitem.ReferenceAddress),
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
