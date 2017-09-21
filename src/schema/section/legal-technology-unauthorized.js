import * as form from '../form'

export const legalTechnologyUnauthorized = (data = {}) => {
  return {
    HasUnauthorized: form.branch(data.HasUnauthorized),
    List: form.collection(data.List, data.ListBranch)
  }
}
