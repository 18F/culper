import * as form from '../form'

export const substanceDrugVoluntary = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        DrugType: form.radio(xitem.DrugType),
        TreatmentProvider: form.text(xitem.TreatmentProvider),
        TreatmentProviderAddress: form.location(xitem.TreatmentProviderAddress),
        TreatmentProviderTelephone: form.telephone(
          xitem.TreatmentProviderTelephone
        ),
        TreatmentDates: form.daterange(xitem.TreatmentDates),
        TreatmentCompleted: form.branch(xitem.TreatmentCompleted),
        NoTreatmentExplanation: form.textarea(xitem.NoTreatmentExplanation)
      }
    }
  })
  return {
    TreatmentVoluntary: form.branch(data.TreatmentVoluntary),
    List: form.collection(items, (data.List || {}).branch)
  }
}
