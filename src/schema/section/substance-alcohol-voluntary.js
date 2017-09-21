import * as form from '../form'

export const substanceAlcoholVoluntary = (data = {}) => {
  return {
    SoughtTreatment: form.branch(data.SoughtTreatment),
    List: form.collection(data.List, data.ListBranch)
  }
}
