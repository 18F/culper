import * as form from '../form'

export const militaryComments = (data = {}) => {
  return {
    Comments: form.text(data.Comments)
  }
}
