import * as form from '../form'

export const foreignActivitiesIndirect = (data = {}) => {
  return {
    HasInterests: form.branch(data.HasInterests),
    List: form.collection(data.List)
  }
}
