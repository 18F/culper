import * as form from '../form'

export const financialGambling = (data = {}) => {
  return {
    HasGamblingDebt: form.branch(data.HasGamblingDebt),
    List: form.collection(data.List)
  }
}
