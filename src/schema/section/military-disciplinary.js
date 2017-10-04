import * as form from '../form'

export const militaryDisciplinary = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Date: form.datecontrol(x.Item.Date),
        Offenses: form.textarea(x.Item.Offenses),
        Name: form.text(x.Item.Name),
        Court: form.textarea(x.Item.Court),
        Outcome: form.textarea(x.Item.Outcome)
      }
    }
  })
  return {
    HasDisciplinary: form.branch(data.HasDisciplinary),
    List: form.collection(items, data.ListBranch)
  }
}
