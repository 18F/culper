import * as form from '../form'

export const legalPoliceOffenses = (data = {}) => {
  return {
    HasOffenses: form.branch(data.HasOffenses),
    List: form.collection(data.List, data.ListBranch)
  }
}
