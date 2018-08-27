import * as form from '../form'

export const psychologicalConsultations = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        CourtAddress: form.location(xitem.CourtAddress),
        CourtName: form.text(xitem.CourtName),
        Disposition: form.text(xitem.Disposition),
        Occurred: form.datecontrol(xitem.Occurred),
        Appeals: form.collection(
          ((xitem.Appeals || {}).items || []).map(y => {
            const yitem = y.Item || {}
            return {
              Item: {
                Has: form.branch(yitem.Has),
                CourtName: form.text(yitem.CourtName),
                CourtAddress: form.location(yitem.CourtAddress),
                Disposition: form.text(yitem.Disposition)
              }
            }
          })
        )
      }
    }
  })
  return {
    Consulted: form.branch(data.Consulted),
    List: form.collection(items, (data.List || {}).branch)
  }
}
