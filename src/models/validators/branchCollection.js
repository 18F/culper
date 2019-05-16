import { validate } from 'validate.js'

const branchCollectionValidator = (value, options = {}) => {
  if (!value) return null // Only validate if there's a value

  const { items } = value
  const { validator } = options

  if (!items || !items.length) return 'Collection is empty'
  if (!validator) return 'Invalid validator'

  const hasNo = items.some(i => i.Item && i.Item.Has && i.Item.Has.value === 'No')

  if (!hasNo) return 'Incomplete collection'

  // Validate each item
  for (let i = 0; i < items.length; i += 1) {
    const { Item } = items[i]
    if (Item && Item.Has && Item.Has.value === 'No') {
      // Skip it
    } else {
      const itemErrors = validate(Item, validator)
      if (itemErrors) return itemErrors
    }
  }

  return null
}

export default branchCollectionValidator
