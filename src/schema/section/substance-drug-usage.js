import * as form from '../form'

export const substanceDrugUsage = (data = {}) => {
  return {
    UsedDrugs: form.branch(data.UsedDrugs),
    List: form.collection(data.List)
  }
}
