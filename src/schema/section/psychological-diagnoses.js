import * as form from '../form'

export const psychologicalDiagnoses = (data = {}) => {
  const diagnosisItems = (data.DiagnosisList || []).map(x => {
    return {
      Item: {
        Condition: form.radio(x.Item.Condition),
        Diagnosed: form.daterange(x.Item.Diagnosed),
        Treatment: form.treatment(x.Item.Treatment),
        TreatmentFacility: form.treatment(x.Item.TreatmentFacility),
        Effective: form.branch(x.Item.Effective),
        Explanation: form.textarea(x.Item.Explanation)
      }
    }
  })
  const treatmentItems = (data.TreatmentList || []).map(x => {
    return {
      Item: {
        Name: form.text(x.Item.Name),
        Phone: form.telephone(x.Item.Phone),
        Address: form.location(x.Item.Address)
      }
    }
  })
  return {
    Diagnosed: form.branch(data.Diagnosed),
    DidNotConsult: form.branch(data.DidNotConsult),
    DiagnosisList: form.collection(diagnosisItems, data.DiagnosisListBranch),
    InTreatment: form.branch(data.InTreatment),
    TreatmentList: form.collection(treatmentItems, data.TreatmentListBranch)
  }
}
