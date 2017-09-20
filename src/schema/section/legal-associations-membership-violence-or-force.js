import * as form from '../form'

export const legalAssociationsMembershipViolenceOrForce = (data = {}) => {
  return {
    HasViolence: form.branch(data.HasViolence),
    List: form.collection(data.List)
  }
}
