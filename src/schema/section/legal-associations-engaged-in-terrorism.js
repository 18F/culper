import * as form from '../form'

export const legalAssociationsEngagedInTerrorism = (data = {}) => {
  return {
    HasEngaged: form.branch(data.HasEngaged),
    List: form.collection(data.List)
  }
}
