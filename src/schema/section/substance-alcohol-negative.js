import * as form from '../form'

export const substanceAlcoholNegative = (data = {}) => {
  return {
    HasImpacts: form.branch(data.HasImpacts),
    List: form.collection(data.List, data.ListBranch)
  }
}
