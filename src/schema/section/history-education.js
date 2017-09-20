import * as form from '../form'

export const historyEducation = (data = {}) => {
  return {
    HasAttended: form.branch(data.HasAttended),
    HasDegree10: form.branch(data.HasDegree10),
    List: form.collection(data.List)
  }
}
