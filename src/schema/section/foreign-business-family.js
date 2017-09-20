import * as form from '../form'

export const foreignBusinessFamily = (data = {}) => {
  return {
    HasForeignFamily: form.branch(data.HasForeignFamily),
    List: form.collection(data.List)
  }
}
