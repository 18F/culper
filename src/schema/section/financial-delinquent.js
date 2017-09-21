import * as form from '../form'

export const financialDelinquent = (data = {}) => {
  return {
    HasDelinquent: form.branch(data.HasDelinquent),
    List: form.collection(data.List, data.ListBranch)
  }
}
