import * as form from '../form'

export const psychologicalComments = (data = {}) => {
  return {
    Comments: form.text(data.Comments)
  }
}
