import * as form from '../form'

export const foreignTravel = (data = {}) => {
  return {
    HasForeignTravelOutside: form.branch(data.HasForeignTravelOutside),
    HasForeignTravelOfficial: form.branch(data.HasForeignTravelOfficial),
    List: form.collection(data.List)
  }
}
