import * as form from '../form'

export const substanceDrugOrdered = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        OrderedBy: form.checkboxgroup(x.Item.OrderedBy),
        Explanation: form.textarea(x.Item.Explanation),
        ActionTaken: form.branch(x.Item.ActionTaken),
        NoActionTakenExplanation: form.textarea(x.Item.NoActionTakenExplanation),
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
