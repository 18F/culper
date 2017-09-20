import * as form from '../form'

export const legalTechnologyManipulating = (data = {}) => {
  return {
    HasManipulating: form.branch(data.HasManipulating),
    List: form.collection(data.List)
  }
}
