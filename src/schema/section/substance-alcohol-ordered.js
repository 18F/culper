import * as form from '../form'

export const substanceAlcoholOrdered = (data = {}) => {
  return {
    HasBeenOrdered: form.branch(data.HasBeenOrdered),
    List: form.collection(data.List, data.ListBranch)
  }
}
