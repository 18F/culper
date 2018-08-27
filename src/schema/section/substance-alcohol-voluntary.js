import * as form from '../form'

export const substanceAlcoholVoluntary = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
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
    SoughtTreatment: form.branch(data.SoughtTreatment),
    List: form.collection(items, (data.List || {}).branch)
  }
}
