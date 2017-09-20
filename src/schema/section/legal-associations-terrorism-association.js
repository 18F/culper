import * as form from '../form'

export const legalAssociationsTerrorismAssociation = (data = {}) => {
  return {
    HasTerrorism: form.branch(data.HasTerrorism),
    List: form.collection(data.List)
  }
}
