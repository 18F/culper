import { general } from './general'
import { textarea } from './textarea'
import { branch } from './branch'
import { datecontrol } from './datecontrol'
import { collection } from './collection'

export const reasonleft = (data = {}) => {
  return general('reasonleft', {
    Comments: textarea(data.Comments),
    Reasons: collection(
      ((data.Reasons || {}).items || []).map(y => {
        const yitem = y.Item || {}
        return {
          Item: {
            Has: branch(yitem.Has),
            Reason: textarea(yitem.Reason),
            Text: textarea(yitem.Text),
            Date: datecontrol(yitem.Date)
          }
        }
      })
    ),
    ReasonDescription: textarea(data.ReasonDescription)
  })
}
