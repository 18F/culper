import * as form from '../form'

export const relationshipsComments = (data = {}) => {
  return {
    Comments: form.text(data.Comments)
  }
}
