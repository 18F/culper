import * as form from '../form'

export const financialBankruptcy = (data = {}) => {
  return {
    HasBankruptcy: form.branch(data.HasBankruptcy),
    List: form.collection(data.List)
  }
}
