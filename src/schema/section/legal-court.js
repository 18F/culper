import * as form from '../form'

export const legalCourt = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        CivilActionDate: form.datecontrol(x.Item.CivilActionDate),
        CourtName: form.text(x.Item.CourtName),
        CourtAddress: form.location(x.Item.CourtAddress),
        NatureOfAction: form.textarea(x.Item.NatureOfAction),
        ResultsOfAction: form.textarea(x.Item.ResultsOfAction),
        PrincipalPartyNames: form.textarea(x.Item.PrincipalPartyNames)
      }
    }
  })
  return {
    HasCourtActions: form.branch(data.HasCourtActions),
    List: form.collection(items, data.ListBranch)
  }
}
