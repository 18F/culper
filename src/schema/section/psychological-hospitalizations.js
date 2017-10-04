import * as form from '../form'

export const psychologicalHospitalizations = (data = {}) => {
  const items = (data.List || []).map(x => {
    return {
      Item: {
        TreatmentDate: form.daterange(x.Item.TreatmentDate),
        Admission: form.radio(x.Item.Admission),
        Facility: form.text(x.Item.Facility),
        FacilityAddress: form.location(x.Item.FacilityAddress),
        Explanation: form.textarea(x.Item.Explanation)
      }
    }
  })
  return {
    Hospitalized: form.branch(data.Hospitalized),
    List: form.collection(items, data.ListBranch)
  }
}
