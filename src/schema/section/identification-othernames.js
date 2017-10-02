import * as form from '../form'

export const identificationOthernames = (data = {}) => {
  const names = data.List.map(x => {
    return {
      Item: {
        Name: form.name(x.Name),
        MaidenName: form.radio(x.MaidenName),
        DatesUsed: form.daterange(x.DatesUsed),
        Reason: form.textarea(x.Reason)
      }
    }
  })
  return {
    HasOtherNames: form.branch(data.HasOtherNames),
    List: form.collection(names, data.ListBranch)
  }
}
