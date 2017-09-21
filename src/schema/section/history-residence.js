import * as form from '../form'

export const historyResidence = (data = {}) => {
  return {
    List: form.collection(data.List, data.ListBranch)
  }
}
