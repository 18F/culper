import * as form from '../form'

export const psychologicalCompetence = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        CourtAddress: form.location(x.Item.CourtAddress),
        CourtName: form.text(x.Item.CourtName),
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
    IsIncompetent: form.branch(data.IsIncompetent),
    List: form.collection(items, data.ListBranch)
  }
}
