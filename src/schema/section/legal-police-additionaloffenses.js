import * as form from '../form'

export const legalPoliceAdditionalOffenses = (data = {}) => {
  return {
    HasOtherOffenses: form.branch(data.HasOtherOffenses),
    List: form.collection(data.List, data.ListBranch)
  }
}
