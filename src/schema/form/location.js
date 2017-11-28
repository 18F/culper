import { general } from './general'
import { countryString } from '../../validators/location'

export const location = (data = {}) => {
  return general('location', {
    ...data,
    country: countryString(data.country)
  })
}
