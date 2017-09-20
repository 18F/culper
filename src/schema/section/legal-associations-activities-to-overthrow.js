import * as form from '../form'

export const legalAssociationsActivitiesToOverthrow = (data = {}) => {
  return {
    HasActivities: form.branch(data.HasActivities),
    List: form.collection(data.List)
  }
}
