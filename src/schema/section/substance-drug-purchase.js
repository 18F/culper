import * as form from '../form'

export const substanceDrugPurchase = (data = {}) => {
  return {
    Involved: form.branch(data.Involved),
    List: form.collection(data.List)
  }
}
