import { general } from './general'
import { textarea } from './textarea'
import { collection } from './collection'

export const reasonleft = (data) => {
  return general('reasonleft', {
    Comments: textarea(data.Comments),
    Reasons: collection(data.Reasons),
    ReasonDescription: textarea(data.ReasonDescription)
  })
}
