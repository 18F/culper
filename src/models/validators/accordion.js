import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import {
  MISSING_ITEMS, INVALID_BRANCH, INVALID_VALIDATOR, INVALID_ITEM,
} from 'constants/errors'
import { NO } from 'constants/values'

/**
 * Accordion:
 * {
 *  items: [
 *  {
 *    Item: {},
 *   }
 * ],
 *  branch: { value: 'No' },
 * }
*/

const accordionValidator = (value, options = {}) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { validator, length, ignoreBranch } = options
  if (!validator) return INVALID_VALIDATOR

  const { items, branch } = value
  // Validate branch
  if (!ignoreBranch && (!branch || !branch.value || branch.value !== NO)) {
    return INVALID_BRANCH
  }

  if (!items || (items && items.length < 1)) return MISSING_ITEMS

  // Validate item length
  if (length) {
    const lengthErrors = validateModel({ items }, { items: { length } })
    if (lengthErrors !== true) return lengthErrors
  }

  let itemsErrors = []
  for (let i = 0; i < items.length; i += 1) {
    const { Item } = items[i]
    if (!Item) return INVALID_ITEM

    const itemErrors = validateModel(Item, validator, options)
    if (itemErrors !== true) itemsErrors = itemsErrors.concat(itemErrors)
  }

  if (itemsErrors.length) return itemsErrors

  return null
}

export default accordionValidator
