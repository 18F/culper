import * as form from '../form'

export const legalPoliceOffenses = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Date: form.datecontrol(x.Item.Date),
        Description: form.textarea(x.Item.Description),
        InvolvedViolence: form.branch(x.Item.InvolvedViolence),
        InvolvedFirearms: form.branch(x.Item.InvolvedFirearms),
        InvolvedSubstances: form.branch(x.Item.InvolvedSubstances),
        Address: form.location(x.Item.Address),
        WasCited: form.branch(x.Item.WasCited),
        CitedBy: form.text(x.Item.CitedBy),
        AgencyAddress: form.location(x.Item.AgencyAddress),
        WasCharged: form.branch(x.Item.WasCharged),
        Explanation: form.textarea(x.Item.Explanation),
        CourtName: form.text(x.Item.CourtName),
        CourtAddress: form.location(x.Item.CourtAddress),
        CourtCharge: form.text(x.Item.CourtCharge),
        CourtOutcome: form.text(x.Item.CourtOutcome),
        CourtDate: form.datecontrol(x.Item.CourtDate),
        ChargeType: form.radio(x.Item.ChargeType),
        WasSentenced: form.branch(x.Item.WasSentenced),
        Sentence: form.sentence(x.Item.Sentence),
        AwaitingTrial: form.branch(x.Item.AwaitingTrial),
        AwaitingTrialExplanation: form.textarea(x.Item.AwaitingTrialExplanation)
      }
    }
  })
  return {
    HasOffenses: form.branch(data.HasOffenses),
    List: form.collection(items, data.ListBranch)
  }
}
