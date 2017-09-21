import * as form from '../form'

export const foreignBusinessSponsorship = (data = {}) => {
  return {
    HasForeignSponsorship: form.branch(data.HasForeignSponsorship),
    List: form.collection(data.List, data.ListBranch)
  }
}
