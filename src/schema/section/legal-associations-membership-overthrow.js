import * as form from '../form'

export const legalAssociationsMembershipOverthrow = (data = {}) => {
  return {
    HasOverthrow: form.branch(data.HasOverthrow),
    List: form.collection(data.List)
  }
}
