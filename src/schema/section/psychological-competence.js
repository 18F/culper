import * as form from '../form'

export const psychologicalCompetence = (data = {}) => {
  return {
    IsIncompetent: form.branch(data.IsIncompetent),
    List: form.collection(data.List, data.ListBranch)
  }
}
