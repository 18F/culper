import { general } from './general'
import { radio } from './radio'
import { textarea } from './textarea'

export const clearancelevel = (data) => {
  return general('clearancelevel', {
    Level: radio(data.Level),
    Explanation: textarea(data.Explanation)
  })
}
