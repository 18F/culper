import * as form from '../form'

export const substanceDrugOrdered = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        OrderedBy: form.checkboxgroup(xitem.OrderedBy),
        Explanation: form.textarea(xitem.Explanation),
        ActionTaken: form.branch(xitem.ActionTaken),
        NoActionTakenExplanation: form.textarea(xitem.NoActionTakenExplanation),
        DrugType: form.radio(xitem.DrugType),
        TreatmentProvider: form.text(xitem.TreatmentProvider),
        TreatmentProviderAddress: form.location(xitem.TreatmentProviderAddress),
        TreatmentProviderTelephone: form.telephone(xitem.TreatmentProviderTelephone),
        TreatmentDates: form.daterange(xitem.TreatmentDates),
        TreatmentCompleted: form.branch(xitem.TreatmentCompleted),
        NoTreatmentExplanation: form.textarea(xitem.NoTreatmentExplanation)
      }
    }
  })
  return {
    TreatmentOrdered: form.branch(data.TreatmentOrdered),
    List: form.collection(items, (data.List || {}).branch)
  }
}
