import * as form from '../form'

export const foreignBusinessPolitical = (data = {}) => {
  return {
    HasForeignPolitical: form.branch(data.HasForeignPolitical),
    List: form.collection(data.List, data.ListBranch)
  }
}
