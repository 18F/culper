import * as form from '../form'

export const foreignPassport = (data = {}) => {
  return {
    HasPassports: form.branch(data.HasPassports),
    Name: form.name(data.Name),
    Number: form.text(data.Number),
    Card: form.radio(data.Card),
    Issued: form.datecontrol(data.Issued),
    Expiration: form.datecontrol(data.Expiration),
    Comments: form.textarea(data.Comments)
  }
}
