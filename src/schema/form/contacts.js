import { general } from './general'
import { collection } from './collection'

export const contacts = (data) => {
  return general('contacts', {
    List: collection(data.List)
  })
}
