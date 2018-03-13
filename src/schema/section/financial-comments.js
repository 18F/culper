import * as form from '../form'

export const financialComments = (data = {}) => {
  return {
    Comments: form.text(data.Comments)
  }
}
