import { general } from './general'

export const height = (data = {}) => {
  return general('height', {
    feet: parseInt(data.feet) || 0,
    inches: parseInt(data.inches) || 0
  })
}
