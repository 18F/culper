import * as form from '../form'

const foreignPassport = (data = {}) => ({
  HasPassports: form.branch(data.HasPassports),
  Name: form.name(data.Name),
  Number: form.text(data.Number),
  Card: form.radio(data.Card),
  Issued: form.datecontrol(data.Issued),
  Expiration: form.datecontrol(data.Expiration),
  Comments: form.textarea(data.Comments),
})

export default foreignPassport
