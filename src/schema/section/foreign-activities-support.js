import * as form from '../form'

export const foreignActivitiesSupport = (data = {}) => {
  return {
    HasForeignSupport: form.branch(data.HasForeignSupport),
    List: form.collection(data.List, data.ListBranch)
  }
}
