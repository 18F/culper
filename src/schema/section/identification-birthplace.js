import * as form from '../form'

export const identificationBirthplace = (data = {}) => {
  return {
    Location: form.location(data.Location)
  }
}
