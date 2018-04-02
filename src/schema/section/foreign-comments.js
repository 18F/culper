import * as form from '../form'

export const foreignComments = (data = {}) => {
  return {
    Comments: form.text(data.Comments)
  }
}
