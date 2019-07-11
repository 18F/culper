import { validateModel } from 'models/validate'
import {
  MISSING_ITEMS, INCOMPLETE_COLLECTION, INVALID_VALIDATOR,
} from 'constants/errors'
import { NO } from 'constants/values'

/**
 * BranchCollection:
 * {
 *  items: [
 *    { Item: { Has: { value: 'Yes' } } }
 *    { Item: { Has: { value: 'No' } } }
 *  ]
 * }
 */

const branchCollectionValidator = (value, options = {}) => {
  if (value === undefined) return null // Only validate if there's a value
  if (value === null) return MISSING_ITEMS

  const { items } = value
  const { validator } = options

  if (!items || !items.length) return MISSING_ITEMS
  if (!validator) return INVALID_VALIDATOR

  const hasNo = items.some(i => i.Item && i.Item.Has && i.Item.Has.value === NO)

  if (!hasNo) return INCOMPLETE_COLLECTION

  // Validate each item
  let itemsErrors = []
  for (let i = 0; i < items.length; i += 1) {
    const { Item } = items[i]
    if (Item && Item.Has && Item.Has.value === NO) {
      // Skip it
    } else {
      const itemErrors = validateModel(Item, validator, options)
      if (itemErrors !== true) itemsErrors = itemsErrors.concat(itemErrors)
    }
  }

  if (itemsErrors.length) return itemsErrors

  return null
}

export default branchCollectionValidator
