import { general } from './general'
import { text } from './text'
import { telephone } from './telephone'
import { location } from './location'

export const treatment = (data = {}) => {
  return general('psychological.treatment', {
    Name: text(data.Name),
    Phone: telephone(data.Phone),
    Address: location(data.Address)
  })
}
