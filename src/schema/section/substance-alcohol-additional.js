import * as form from '../form'

export const substanceAlcoholAdditional = (data = {}) => {
  return {
    ReceivedTreatment: form.branch(data.ReceivedTreatment),
    List: form.collection(data.List, data.ListBranch)
  }
}
