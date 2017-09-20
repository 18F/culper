import * as form from '../form'

export const substanceDrugVoluntary = (data = {}) => {
  return {
    Involved: form.branch(data.Involved),
    List: form.collection(data.List)
  }
}
