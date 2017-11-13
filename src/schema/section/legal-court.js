import * as form from '../form'

export const legalCourt = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        CivilActionDate: form.datecontrol(xitem.CivilActionDate),
        CourtName: form.text(xitem.CourtName),
        CourtAddress: form.location(xitem.CourtAddress),
        NatureOfAction: form.textarea(xitem.NatureOfAction),
        ResultsOfAction: form.textarea(xitem.ResultsOfAction),
        PrincipalPartyNames: form.textarea(xitem.PrincipalPartyNames)
      }
    }
  })
  return {
    HasCourtActions: form.branch(data.HasCourtActions),
    List: form.collection(items, (data.List || {}).branch)
  }
}
