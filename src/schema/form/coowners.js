import { general } from './general'
import { collection } from './collection'

export const coowners = (data = {}) => {
  return general('coowners', {
    List: collection(data.List)
  })
}
