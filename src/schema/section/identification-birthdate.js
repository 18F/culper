import * as form from '../form'

export const identificationBirthdate = (data = {}) => {
  return {
    date: form.datecontrol(data.date)
  }
}
