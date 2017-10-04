import { general } from './general'
import { name } from './name'
import { telephone } from './telephone'
import { location } from './location'

export const psychologicalTreatment = (data = {}) => {
  return general('psychological.treatment', {
    Name: name(data.Name),
    Phone: telephone(data.Phone),
    Address: location(data.Address)
  })
}
