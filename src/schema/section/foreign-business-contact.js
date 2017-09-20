import * as form from '../form'

export const foreignBusinessContact = (data = {}) => {
  return {
    HasForeignContact: form.branch(data.HasForeignContact),
    List: form.collection(data.List)
  }
}
