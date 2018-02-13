import { general } from './general'
import { datecontrol } from './datecontrol'

export const daterange = (data = {}) => {
  return general('daterange', {
    to: datecontrol(data.to),
    from: datecontrol(data.from),
    present: data.present
  })
}
