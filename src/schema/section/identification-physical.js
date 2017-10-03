import * as form from '../form'

export const identificationPhysical = (data = {}) => {
  return {
    Comments: form.textarea(data.Comments),
    EyeColor: form.text({ value: data.EyeColor }),
    HairColor: form.text({ value: data.HairColor }),
    Height: form.height(data.Height),
    Sex: form.text({ value: data.Sex }),
    Weight: form.number({ value: data.Weight })
  }
}
