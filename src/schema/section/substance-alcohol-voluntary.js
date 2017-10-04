import * as form from '../form'

export const substanceAlcoholVoluntary = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
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
    SoughtTreatment: form.branch(data.SoughtTreatment),
    List: form.collection(items, data.ListBranch)
  }
}
