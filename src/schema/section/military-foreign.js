import * as form from '../form'

export const militaryForeign = (data = {}) => {
  return {
    List: form.collection(data.List)
  }
}
