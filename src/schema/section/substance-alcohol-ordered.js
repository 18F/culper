import * as form from '../form'

export const substanceAlcoholOrdered = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        Seekers: form.checkboxgroup(x.Item.Seekers),
        OtherSeeker: form.text(x.Item.OtherSeeker),
        ActionTaken: form.branch(x.Item.ActionTaken),
        NoActionTakenExplanation: form.textarea(x.Item.NoActionTakenExplanation),
        CounselingDates: form.daterange(x.Item.CounselingDates),
        TreatmentProviderName: form.text(x.Item.TreatmentProviderName),
        TreatmentProviderAddress: form.location(x.Item.TreatmentProviderAddress),
        TreatmentProviderTelephone: form.telephone(x.Item.TreatmentProviderTelephone),
        CompletedTreatment: form.branch(x.Item.CompletedTreatment),
        NoCompletedTreatmentExplanation: form.textarea(x.Item.NoCompletedTreatmentExplanation)
      }
    }
  })
  return {
    HasBeenOrdered: form.branch(data.HasBeenOrdered),
    List: form.collection(items, data.ListBranch)
  }
}
