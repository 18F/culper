import * as form from '../form'

export const legalInvestigationsRevoked = (data = {}) => {
  return {
    HasRevocations: form.branch(data.HasRevocations),
    List: form.collection(data.List)
  }
}
