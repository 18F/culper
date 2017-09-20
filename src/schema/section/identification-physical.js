import * as form from '../form'

export const identificationPhysical = (data = {}) => {
  return {
    Comments: form.textarea(data.Comments),
    EyeColor: form.text(data.EyeColor),
    HairColor: form.text(data.HairColor),
    Height: form.height(data.Height),
    Sex: form.text(data.Sex),
    Weight: form.number(data.Weight)
  }
}
