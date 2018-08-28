import * as form from '../form'

export const financialBankruptcy = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        PetitionType: form.radio(xitem.PetitionType),
        CourtAddress: form.location(xitem.CourtAddress),
        CourtInvolved: form.text(xitem.CourtInvolved),
        CourtNumber: form.text(xitem.CourtNumber),
        NameDebt: form.name(xitem.NameDebt),
        TotalAmount: form.number(xitem.TotalAmount),
        DateFiled: form.datecontrol(xitem.DateFiled),
        DateDischarged: form.datecontrol(xitem.DateDischarged),
        DateDischargedNotApplicable: form.notapplicable(
          xitem.DateDischargedNotApplicable
        ),
        HasDischargeExplanation: form.branch(xitem.HasDischargeExplanation),
        DischargeExplanation: form.textarea(xitem.DischargeExplanation),
        Trustee: form.text(xitem.Trustee),
        TrusteeAddress: form.location(xitem.TrusteeAddress)
      }
    }
  })
  return {
    HasBankruptcy: form.branch(data.HasBankruptcy),
    List: form.collection(items, (data.List || {}).branch)
  }
}
