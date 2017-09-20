import * as form from '../form'

export const financialCredit = (data = {}) => {
  return {
    HasCreditCounseling: form.branch(data.HasCreditCounseling),
    List: form.collection(data.List)
  }
}
