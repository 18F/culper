import * as form from '../form'

export const foreignActivitiesRealestate = (data = {}) => {
  return {
    HasInterests: form.branch(data.HasInterests),
    List: form.collection(data.List)
  }
}
