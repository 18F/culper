import * as form from '../form'

export const militaryHistory = (data = {}) => {
  return {
    HasServed: form.branch(data.HasServed),
    List: form.collection(data.List, data.ListBranch)
  }
}
