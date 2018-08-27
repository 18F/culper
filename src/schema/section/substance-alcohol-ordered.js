import * as form from '../form'

export const substanceAlcoholOrdered = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Seekers: form.checkboxgroup(xitem.Seekers),
        OtherSeeker: form.text(xitem.OtherSeeker),
        ActionTaken: form.branch(xitem.ActionTaken),
        NoActionTakenExplanation: form.textarea(xitem.NoActionTakenExplanation),
        CounselingDates: form.daterange(xitem.CounselingDates),
        TreatmentProviderName: form.text(xitem.TreatmentProviderName),
        TreatmentProviderAddress: form.location(xitem.TreatmentProviderAddress),
        TreatmentProviderTelephone: form.telephone(
          xitem.TreatmentProviderTelephone
        ),
        CompletedTreatment: form.branch(xitem.CompletedTreatment),
        NoCompletedTreatmentExplanation: form.textarea(
          xitem.NoCompletedTreatmentExplanation
        )
      }
    }
  })
  return {
    HasBeenOrdered: form.branch(data.HasBeenOrdered),
    List: form.collection(items, (data.List || {}).branch)
  }
}
