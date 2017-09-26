import * as form from '../form'

export const identificationName = (data = {}) => {
  return {
    Name: form.name(data)
  }
}
