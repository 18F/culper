import * as form from '../form'

export const financialCard = (data = {}) => {
  return {
    HasCardAbuse: form.branch(data.HasCardAbuse),
    List: form.collection(data.List)
  }
}
