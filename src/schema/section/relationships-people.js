import * as form from '../form'

export const relationshipsPeople = (data = {}) => {
  return {
    List: form.collection(data.List, data.ListBranch)
  }
}
