import * as form from '../form'

export const legalInvestigationsHistory = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Agency: form.text(x.Item.Agency),
        AgencyNotApplicable: form.notapplicable(x.Item.AgencyNotApplicable),
        Completed: form.datecontrol(x.Item.Completed),
        CompletedNotApplicable: form.notapplicable(x.Item.CompletedNotApplicable),
        Issued: form.text(x.Item.Issued),
        Granted: form.datecontrol(x.Item.Granted),
        GrantedNotApplicable: form.notapplicable(x.Item.GrantedNotApplicable),
        ClearanceLevel: form.clearancelevel(x.Item.ClearanceLevel),
        ClearanceLevelNotApplicable: form.notapplicable(x.Item.ClearanceLevelNotApplicable)
      }
    }
  })
  return {
    HasHistory: form.branch(data.HasHistory),
    List: form.collection(items, data.ListBranch)
  }
}
