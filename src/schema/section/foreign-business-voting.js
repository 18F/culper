import * as form from '../form'

export const foreignBusinessVoting = (data = {}) => {
  return {
    HasForeignVoting: form.branch(data.HasForeignVoting),
    List: form.collection(data.List, data.ListBranch)
  }
}
