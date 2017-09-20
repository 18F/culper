import * as form from '../form'

export const militaryDisciplinary = (data = {}) => {
  return {
    HasDisciplinary: form.branch(data.HasDisciplinary),
    List: form.collection(data.List)
  }
}
