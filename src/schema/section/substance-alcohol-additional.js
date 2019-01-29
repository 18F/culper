import * as form from '../form'

export const substanceAlcoholAdditional = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        TreatmentProviderName: form.text(xitem.TreatmentProviderName),
        TreatmentProviderAddress: form.location(xitem.TreatmentProviderAddress),
        AgencyName: form.text(xitem.AgencyName),
        AgencyAddress: form.location(xitem.AgencyAddress),
        UseSameAddress: form.branch(xitem.UseSameAddress),
        TreatmentBeganDate: form.datecontrol(xitem.TreatmentBeganDate),
        TreatmentEndDate: form.datecontrol(xitem.TreatmentEndDate),
        PresentTreatmentEndDate: form.checkbox(xitem.PresentTreatmentEndDate),
        CompletedTreatment: form.branch(xitem.CompletedTreatment),
        NoCompletedTreatmentExplanation: form.textarea(
          xitem.NoCompletedTreatmentExplanation
        )
      }
    }
  })
  return {
    ReceivedTreatment: form.branch(data.ReceivedTreatment),
    List: form.collection(items, (data.List || {}).branch)
  }
}
