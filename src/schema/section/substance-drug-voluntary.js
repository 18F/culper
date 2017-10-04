import * as form from '../form'

export const substanceDrugVoluntary = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        DrugType: form.checkbox(x.Item.DrugType),
        TreatmentProvider: form.text(x.Item.TreatmentProvider),
        TreatmentProviderAddress: form.location(x.Item.TreatmentProviderAddress),
        TreatmentProviderTelephone: form.telephone(x.Item.TreatmentProviderTelephone),
        TreatmentDates: form.daterange(x.Item.TreatmentDates),
        TreatmentCompleted: form.branch(x.Item.TreatmentCompleted),
        NoTreatmentExplanation: form.textarea(x.Item.NoTreatmentExplanation)
      }
    }
  })
  return {
    Involved: form.branch(data.Involved),
    List: form.collection(items, data.ListBranch)
  }
}
