import * as form from '../form'

export const substanceAlcoholAdditional = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        TreatmentProviderName: form.text(x.Item.TreatmentProviderName),
        TreatmentProviderAddress: form.location(x.Item.TreatmentProviderAddress),
        AgencyName: form.text(x.Item.AgencyName),
        AgencyAddress: form.location(x.Item.AgencyAddress),
        UseSameAddress: form.branch(x.Item.UseSameAddress),
        TreatmentBeganDate: form.datecontrol(x.Item.TreatmentBeganDate),
        TreatmentEndDate: form.datecontrol(x.Item.TreatmentEndDate),
        CompletedTreatment: form.branch(x.Item.CompletedTreatment),
        NoCompletedTreatmentExplanation: form.textarea(x.Item.NoCompletedTreatmentExplanation)
      }
    }
  })
  return {
    ReceivedTreatment: form.branch(data.ReceivedTreatment),
    List: form.collection(items, data.ListBranch)
  }
}
