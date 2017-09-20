import * as form from '../form'

export const psychologicalDiagnoses = (data = {}) => {
  return {
    Diagnosed: form.branch(data.Diagnosed),
    DidNotConsult: form.branch(data.DidNotConsult),
    DiagnosisList: form.collection(data.DiagnosisList),
    InTreatment: form.branch(data.InTreatment),
    TreatmentList: form.collection(data.TreatmentList)
  }
}
