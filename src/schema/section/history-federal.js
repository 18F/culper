import * as form from '../form'

export const historyFederal = (data = {}) => {
  return {
    HasFederalService: form.branch(data.HasFederalService),
    List: form.collection(data.List, data.ListBranch)
  }
}
