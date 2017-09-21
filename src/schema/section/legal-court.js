import * as form from '../form'

export const legalCourt = (data = {}) => {
  return {
    HasCourtActions: form.branch(data.HasCourtActions),
    List: form.collection(data.List, data.ListBranch)
  }
}
