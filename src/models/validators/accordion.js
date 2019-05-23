import { validate } from 'validate.js'
import { validateModel } from 'models/validate'

const accordionValidator = (value, options = {}) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { validator } = options
  if (!validator) return 'Invalid validator'

  const { items, branch } = value
  if (!branch || !branch.value || branch.value !== 'No') {
    return 'Invalid branch'
  }

  if (!items || (items && items.length < 1)) return 'No items'

  let itemErrors
  for (let i = 0; i < items.length; i += 1) {
    const { Item } = items[i]
    itemErrors = validateModel(Item, validator)
    if (itemErrors !== true) return itemErrors
  }

  return null
}

export default accordionValidator
