import * as form from '../form'

export const legalInvestigationsHistory = (data = {}) => {
  return {
    HasHistory: form.branch(data.HasHistory),
    List: form.collection(data.List, data.ListBranch)
  }
}
