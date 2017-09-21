import * as form from '../form'

export const financialNonpayment = (data = {}) => {
  return {
    HasNonpayment: form.branch(data.HasNonpayment),
    List: form.collection(data.List, data.ListBranch)
  }
}
