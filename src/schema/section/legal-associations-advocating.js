import * as form from '../form'

export const legalAssociationsAdvocating = (data = {}) => {
  return {
    HasAdvocated: form.branch(data.HasAdvocated),
    List: form.collection(data.List)
  }
}
