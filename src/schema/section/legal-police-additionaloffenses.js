import * as form from '../form'

export const legalPoliceAdditionalOffenses = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Date: form.datecontrol(xitem.Date),
        Description: form.textarea(xitem.Description),
        InvolvedViolence: form.branch(xitem.InvolvedViolence),
        InvolvedFirearms: form.branch(xitem.InvolvedFirearms),
        InvolvedSubstances: form.branch(xitem.InvolvedSubstances),
        CourtName: form.text(xitem.CourtName),
        CourtAddress: form.location(xitem.CourtAddress),
        CourtCharge: form.text(xitem.CourtCharge),
        CourtOutcome: form.text(xitem.CourtOutcome),
        CourtDate: form.datecontrol(xitem.CourtDate),
        ChargeType: form.radio(xitem.ChargeType),
        WasSentenced: form.branch(xitem.WasSentenced),
        Sentence: form.sentence(xitem.Sentence),
        AwaitingTrial: form.branch(xitem.AwaitingTrial),
        AwaitingTrialExplanation: form.textarea(xitem.AwaitingTrialExplanation)
      }
    }
  })
  return {
    HasOtherOffenses: form.branch(data.HasOtherOffenses),
    List: form.collection(items, (data.List || {}).branch)
  }
}
