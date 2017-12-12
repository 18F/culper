import { general } from './general'

export const number = (data = {}) => {
  return general('number', {
    value: `${data.value || ''}`
  })
}
