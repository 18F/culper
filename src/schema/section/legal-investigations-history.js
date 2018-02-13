import * as form from '../form'

export const legalInvestigationsHistory = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Agency: form.radio(xitem.Agency),
        AgencyExplanation: form.textarea(xitem.AgencyExplanation),
        AgencyNotApplicable: form.notapplicable(xitem.AgencyNotApplicable),
        Completed: form.datecontrol(xitem.Completed),
        CompletedNotApplicable: form.notapplicable(xitem.CompletedNotApplicable),
        Issued: form.text(xitem.Issued),
        Granted: form.datecontrol(xitem.Granted),
        GrantedNotApplicable: form.notapplicable(xitem.GrantedNotApplicable),
        ClearanceLevel: form.clearancelevel(xitem.ClearanceLevel),
        ClearanceLevelNotApplicable: form.notapplicable(xitem.ClearanceLevelNotApplicable)
      }
    }
  })
  return {
    HasHistory: form.branch(data.HasHistory),
    List: form.collection(items, (data.List || {}).branch)
  }
}
