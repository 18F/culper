import * as form from '../form'

export const historyEducation = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Dates: form.daterange(x.Item.Dates),
        Type: form.radio(x.Item.Type),
        Name: form.name(x.Item.Name),
        Address: form.location(x.Item.Address),
        Comments: form.textarea(x.Item.Comments),
        Reference: form.reference(x.Item.Reference),
        Diplomas: form.collection((x.Item.Diplomas || []).map(y => {
          return {
            Item: {
              Diploma: form.radio(y.Item.Diploma),
              DiplomaOther: form.text(y.Item.DiplomaOther),
              Date: form.datecontrol(y.Item.Date)
            }
          }
        }))
      }
    }
  })
  return {
    HasAttended: form.branch(data.HasAttended),
    HasDegree10: form.branch(data.HasDegree10),
    List: form.collection(items, data.ListBranch)
  }
}
