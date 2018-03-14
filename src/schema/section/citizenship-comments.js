import * as form from '../form'

export const citizenshipComments = (data = {}) => {
  return {
    Comments: form.text(data.Comments)
  }
}
