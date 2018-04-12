import * as form from '../form'

export const identificationComments = (data = {}) => {
  return {
    Comments: form.text(data.Comments)
  }
}
