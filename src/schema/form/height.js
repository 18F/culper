import { general } from './general'

export const height = (data) => {
  return general('height', {
    feet: parseInt(data.feet),
    inches: parseInt(data.inches)
  })
}
