import * as form from '../form'

export const substanceComments = (data = {}) => {
  return {
    Comments: form.text(data.Comments)
  }
}
