import * as form from '../form'

export const psychologicalDiagnoses = (data = {}) => {
  const diagnosisItems = ((data.DiagnosisList || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Condition: form.radio(xitem.Condition),
        Diagnosed: form.daterange(xitem.Diagnosed),
        Treatment: form.treatment(xitem.Treatment),
        TreatmentFacility: form.treatment(xitem.TreatmentFacility),
        Effective: form.branch(xitem.Effective),
        Explanation: form.textarea(xitem.Explanation)
      }
    }
  })
  const treatmentItems = ((data.TreatmentList || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Name: form.text(xitem.Name),
        Phone: form.telephone(xitem.Phone),
        Address: form.location(xitem.Address)
      }
    }
  })
  return {
    Diagnosed: form.branch(data.Diagnosed),
    DidNotConsult: form.branch(data.DidNotConsult),
    DiagnosisList: form.collection(
      diagnosisItems,
      (data.DiagnosisList || {}).branch
    ),
    InTreatment: form.branch(data.InTreatment),
    TreatmentList: form.collection(
      treatmentItems,
      (data.TreatmentList || {}).branch
    )
  }
}
