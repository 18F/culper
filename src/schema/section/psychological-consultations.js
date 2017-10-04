import * as form from '../form'

export const psychologicalConsultations = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        CourtAddress: form.location(x.Item.CourtAddress),
        CourtName: form.text(x.Item.CourtName),
        Disposition: form.text(x.Item.Disposition),
        Occurred: form.datecontrol(x.Item.Occurred),
        Appeals: form.collection((x.Item.Appeals || []).map(y => {
          return {
            Item: {
              CourtName: form.text(y.Item.CourtName),
              CourtAddress: form.location(y.Item.CourtAddress),
              Disposition: form.text(y.Item.Disposition)
            }
          }
        }))
      }
    }
  })
  return {
    Consulted: form.branch(data.Consulted),
    List: form.collection(items, data.ListBranch)
  }
}
