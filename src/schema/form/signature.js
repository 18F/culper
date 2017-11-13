import { general } from './general'
import { text } from './text'
import { datecontrol } from './datecontrol'

export const signature = (data = {}) => {
  return general('signature', {
    Name: text(data.Name),
    Date: datecontrol(data.Date)
  })
}
