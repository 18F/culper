import { general } from './general'

export const daterange = (data) => {
  return general('daterange', {
    to: general('datecontrol', data.to),
    from: general('datecontrol', data.from),
    present: data.present
  })
}
