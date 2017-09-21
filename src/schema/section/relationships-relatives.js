import * as form from '../form'

export const relationshipsRelatives = (data = {}) => {
  return {
    List: form.collection(data.List, data.ListBranch)
  }
}
