import * as form from '../form'

export const financialBankruptcy = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        PetitionType: form.radio(x.Item.PetitionType),
        CourtAddress: form.location(x.Item.CourtAddress),
        CourtInvolved: form.text(x.Item.CourtInvolved),
        CourtNumber: form.text(x.Item.CourtNumber),
        NameDebt: form.name(x.Item.NameDebt),
        TotalAmount: form.number(x.Item.TotalAmount),
        DateFiled: form.datecontrol(x.Item.DateFiled),
        DateDischarged: form.datecontrol(x.Item.DateDischarged),
        DateDischargedNotApplicable: form.notapplicable(x.Item.DateDischargedNotApplicable),
        HasDischargeExplanation: form.branch(x.Item.HasDischargeExplanation),
        DischargeExplanation: form.textarea(x.Item.DischargeExplanation),
        Trustee: form.text(x.Item.Trustee),
        TrusteeAddress: form.location(x.Item.TrusteeAddress)
      }
    }
  })
  return {
    HasBankruptcy: form.branch(data.HasBankruptcy),
    List: form.collection(items, data.ListBranch)
  }
}
