import * as form from '../form'

export const militaryDisciplinary = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Date: form.datecontrol(xitem.Date),
        Offenses: form.textarea(xitem.Offenses),
        Name: form.text(xitem.Name),
        Court: form.textarea(xitem.Court),
        Outcome: form.textarea(xitem.Outcome)
      }
    }
  })
  return {
    HasDisciplinary: form.branch(data.HasDisciplinary),
    List: form.collection(items, (data.List || {}).branch)
  }
}
