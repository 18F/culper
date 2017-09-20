import * as form from '../form'

export const historyEmployment = (data = {}) => {
  return {
    List: form.collection(data.List)
  }
}
