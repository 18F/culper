import * as form from '../form'

export const substanceDrugOrdered = (data = {}) => {
  return {
    Involved: form.branch(data.Involved),
    List: form.collection(data.List, data.ListBranch)
  }
}
