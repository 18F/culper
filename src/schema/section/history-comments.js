import * as form from '../form'

export const historyComments = (data = {}) => {
  return {
    Comments: form.text(data.Comments)
  }
}
