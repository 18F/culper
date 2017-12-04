import * as form from '../form'

export const identificationBirthplace = (data = {}) => {
  return {
    location: form.location(data.location)
  }
}
