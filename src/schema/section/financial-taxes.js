import * as form from '../form'

export const financialTaxes = (data = {}) => {
  return {
    HasTaxes: form.branch(data.HasTaxes),
    List: form.collection(data.List, data.ListBranch)
  }
}
