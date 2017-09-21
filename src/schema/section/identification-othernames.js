import * as form from '../form'

export const identificationOthernames = (data = {}) => {
  return {
    HasOtherNames: form.branch(data.HasOtherNames),
    List: form.collection(data.List, data.ListBranch)
  }
}
