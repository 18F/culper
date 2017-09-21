import { general } from './general'
import { branch } from './branch'
import { location } from './location'
import { telephone } from './telephone'

export const physicaladdress = (data) => {
  return general('physicaladdress', {
    HasDifferentAddress: branch(data.HasDifferentAddress),
    Address: location(data.Address),
    Telephone: telephone(data.Telephone)
  })
}
