import * as form from '../form'

export const legalInvestigationsDebarred = (data = {}) => {
  return {
    HasDebarment: form.branch(data.HasDebarment),
    List: form.collection(data.List, data.ListBranch)
  }
}
