import * as form from '../form'

export const legalAssociationsTerrorismAssociation = (data = {}) => {
  return {
    HasTerrorism: form.branch(data.HasTerrorism),
    Explanation: form.textarea(data.Explanation)
  }
}
