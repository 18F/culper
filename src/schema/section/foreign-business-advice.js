import * as form from '../form'

export const foreignBusinessAdvice = (data = {}) => {
  return {
    HasForeignAdvice: form.branch(data.HasForeignAdvice),
    List: form.collection(data.List, data.ListBranch)
  }
}
