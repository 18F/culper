/* eslint import/prefer-default-export: 0 */

import * as form from '../form'

export const legalPoliceAdditionalOffenses = (data = {}) => {
  const items = ((data.List || {}).items || []).map((x) => {
    const xitem = x.Item || {}
    return {
      Item: {
        Has: form.branch(xitem.Has),
        Date: form.datecontrol(xitem.Date),
        Description: form.textarea(xitem.Description),
        InvolvedViolence: form.branch(xitem.InvolvedViolence),
        InvolvedFirearms: form.branch(xitem.InvolvedFirearms),
        InvolvedSubstances: form.branch(xitem.InvolvedSubstances),
        CourtName: form.text(xitem.CourtName),
        CourtAddress: form.location(xitem.CourtAddress),
        Charges: form.collection(
          ((xitem.Charges || {}).items || []).map((y) => {
            const yItem = y.Item || {}
            return {
              Item: {
                ChargeType: form.radio(yItem.ChargeType),
                CourtCharge: form.text(yItem.CourtCharge),
                CourtOutcome: form.text(yItem.CourtOutcome),
                CourtDate: form.datecontrol(yItem.CourtDate),
              },
            }
          })
        ),
        WasSentenced: form.branch(xitem.WasSentenced),
        Sentence: form.sentence(xitem.Sentence),
        AwaitingTrial: form.branch(xitem.AwaitingTrial),
        AwaitingTrialExplanation: form.textarea(xitem.AwaitingTrialExplanation),
      },
    }
  })

  return {
    List: form.collection(items, (data.List || {}).branch),
  }
}
