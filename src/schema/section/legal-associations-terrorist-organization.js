import * as form from '../form'

export const legalAssociationsTerroristOrganization = (data = {}) => {
  return {
    HasTerrorist: form.branch(data.HasTerrorist),
    List: form.collection(data.List, data.ListBranch)
  }
}
