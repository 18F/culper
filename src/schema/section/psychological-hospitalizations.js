import * as form from '../form'

export const psychologicalHospitalizations = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        TreatmentDate: form.daterange(xitem.TreatmentDate),
        Admission: form.radio(xitem.Admission),
        Facility: form.text(xitem.Facility),
        FacilityAddress: form.location(xitem.FacilityAddress),
        Explanation: form.textarea(xitem.Explanation)
      }
    }
  })
  return {
    Hospitalized: form.branch(data.Hospitalized),
    List: form.collection(items, (data.List || {}).branch)
  }
}
