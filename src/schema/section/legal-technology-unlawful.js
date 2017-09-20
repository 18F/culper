import * as form from '../form'

export const legalTechnologyUnlawful = (data = {}) => {
  return {
    HasUnlawful: form.branch(data.HasUnlawful),
    List: form.collection(data.List)
  }
}
