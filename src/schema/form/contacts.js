import { general } from './general'
import { branch } from './branch'
import { textarea } from './textarea'
import { collection } from './collection'

export const contacts = (data = {}) => {
  const items = ((data.List || {}).items || []).map(x => {
    const xitem = x.Item || {}
    return {
      Item: {
        Has: branch(xitem.Has),
        Explanation: textarea(xitem.Explanation)
      }
    }
  })
  return general('contacts', {
    List: collection(items)
  })
}
