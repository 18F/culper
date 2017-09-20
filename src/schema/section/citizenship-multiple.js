import * as form from '../form'

export const citizenshipMultiple = (data = {}) => {
  return {
    HasMultiple: form.branch(data.HasMultiple),
    List: form.collection(data.List)
  }
}
