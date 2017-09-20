import * as form from '../form'

export const legalPoliceDomesticViolence = (data = {}) => {
  return {
    List: form.collection(data.List)
  }
}
