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

const accordionValidator = (value, options, key, attributes, globalOptions) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const {
    validator, length, ignoreBranch, itemsValidator,
  } = options
  if (!validator) return INVALID_VALIDATOR

  const { items, branch } = value
  // Validate branch
  if (!ignoreBranch && (!branch || !branch.value || branch.value !== NO)) {
    return INVALID_BRANCH
  }

  if (!items || (items && items.length < 1)) return MISSING_ITEMS

  // Validate item length
  if (length) {
    const lengthErrors = validateModel({ items }, { items: { length } }, { ...globalOptions })
    if (lengthErrors !== true) return lengthErrors
  }

  let itemsErrors = []
  for (let i = 0; i < items.length; i += 1) {
    const { Item, uuid } = items[i]
    const itemId = uuid || i
    if (!Item) return INVALID_ITEM

    const itemErrors = validateModel(Item, validator, { ...globalOptions, ...options })
    if (itemErrors !== true) itemsErrors = itemsErrors.concat(itemErrors.map(e => `${itemId}.${e}`))
  }
  if (itemsErrors.length) return itemsErrors

  // Optional function to test against all of the items
  if (itemsValidator) {
    const itemsValidatorErrors = itemsValidator(items)
    if (itemsValidatorErrors) return itemsValidatorErrors
  }

  return null
}

export default accordionValidator
