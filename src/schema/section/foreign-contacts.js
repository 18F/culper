import * as form from '../form'

export const foreignContacts = (data = {}) => {
  return {
    HasForeignContacts: form.branch(data.HasForeignContacts),
    List: form.collection(data.List, data.ListBranch)
  }
}
