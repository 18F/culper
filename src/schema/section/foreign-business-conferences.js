import * as form from '../form'

export const foreignBusinessConferences = (data = {}) => {
  return {
    HasForeignConferences: form.branch(data.HasForeignConferences),
    List: form.collection(data.List, data.ListBranch)
  }
}
