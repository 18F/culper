import { general } from './general'

export const location = (data = {}) => {
  return general('location', {
    ...data,
    country: data.country && data.country.value ? data.country.value : data.country
  })
}
