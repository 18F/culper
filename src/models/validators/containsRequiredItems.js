import { validate } from 'validate.js'
import {
  MISSING_ITEMS, INVALID_REQUIREMENTS, REQUIREMENT_NOT_MET,
} from 'constants/errors'

/**
 * Expects options.requirements array of functions to be executed on value.items
 * Validation passes if all of the requirements are passed by at least one item
 */
const containsRequiredItems = (value, options = {}) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { items } = value
  if (!items || (items && items.length < 1)) return MISSING_ITEMS

  const { requirements } = options
  if (!requirements || !requirements.length) return INVALID_REQUIREMENTS

  for (let r = 0; r < requirements.length; r += 1) {
    if (!items.some(requirements[r])) return REQUIREMENT_NOT_MET
  }

  return null
}

export default containsRequiredItems
