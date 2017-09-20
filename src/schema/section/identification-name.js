import * as form from '../form'

export const identificationName = (data = {}) => {
  return {
    name: form.name(data)
  }
}
