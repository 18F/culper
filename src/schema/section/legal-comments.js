import * as form from '../form'

export const legalComments = (data = {}) => {
  return {
    Comments: form.text(data.Comments)
  }
}
