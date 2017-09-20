import * as form from '../form'

export const psychologicalHospitalizations = (data = {}) => {
  return {
    Hospitalized: form.branch(data.Hospitalized),
    List: form.collection(data.List)
  }
}
