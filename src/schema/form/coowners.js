import { general } from './general'
import { collection } from './collection'
import { branch } from './branch'
import { name } from './name'
import { location } from './location'
import { country } from './country'
import { textarea } from './textarea'

export const coowners = (data = {}) => {
  return general('coowners', {
    List: collection(
      ((data.List || {}).items || []).map(y => {
        const yitem = y.Item || {}
        return {
          Item: {
            Has: branch(yitem.Has),
            Name: name(yitem.Name),
            Address: location(yitem.Address),
            Countries: country(yitem.Countries),
            RelationshipNature: textarea(yitem.RelationshipNature)
          }
        }
      })
    )
  })
}
