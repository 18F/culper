import * as form from '../form'

export const psychologicalConsultations = (data = {}) => {
  return {
    Consulted: form.branch(data.Consulted),
    List: form.collection(data.List)
  }
}
