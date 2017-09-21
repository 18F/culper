import * as form from '../form'

export const foreignActivitiesBenefits = (data = {}) => {
  return {
    HasBenefits: form.branch(data.HasBenefits),
    List: form.collection(data.List, data.ListBranch)
  }
}
