import { general } from './general'
import { branch } from './branch'

export const collection = (items = [], addendum = null) => {
  const b = addendum ? branch(addendum) : null
  return general('collection', {
    items: items,
    branch: b
  })
}
