import * as form from '../form'

export const identificationBirthdate = (data = {}) => {
  return {
    Date: form.datecontrol(data.Date),
    Confirmed: form.checkbox(data.Confirmed)
  }
}
