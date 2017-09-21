import * as form from '../form'

export const foreignActivitiesDirect = (data = {}) => {
  return {
    HasInterests: form.branch(data.HasInterests),
    List: form.collection(data.List, data.ListBranch)
  }
}
