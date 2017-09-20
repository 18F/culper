import * as form from '../form'

export const foreignBusinessEmployment = (data = {}) => {
  return {
    HasForeignEmployment: form.branch(data.HasForeignEmployment),
    List: form.collection(data.List)
  }
}
