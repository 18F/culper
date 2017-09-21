import * as form from '../form'

export const substanceDrugMisuse = (data = {}) => {
  return {
    UsedDrugs: form.branch(data.UsedDrugs),
    List: form.collection(data.List, data.ListBranch)
  }
}
