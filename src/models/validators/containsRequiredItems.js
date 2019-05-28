import { validate } from 'validate.js'

/**
 * Expects options.requirements array of functions to be executed on value.items
 * Validation passes if all of the requirements are passed by at least one item
 */
const containsRequiredItems = (value, options = {}) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { items } = value
  if (!items || (items && items.length < 1)) return 'No items'

  const { requirements } = options
  if (!requirements || !requirements.length) return 'No requirements'

  for (let r = 0; r < requirements.length; r += 1) {
    if (!items.some(requirements[r])) return 'Requirement not met'
  }

  return null
}

export default containsRequiredItems
