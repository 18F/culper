import * as form from '../form'

export const foreignBusinessVentures = (data = {}) => {
  return {
    HasForeignVentures: form.branch(data.HasForeignVentures),
    List: form.collection(data.List)
  }
}
