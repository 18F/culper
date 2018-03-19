const history = function (state = {}, action) {
  if (action.section !== 'History') {
    return state
  }
  // copy current state
  let updated = {...state}

  // Override all values for the particular reducer key
  updated[action.property] = action.values

  switch (action.type) {
    case 'History.Residence':
      updated = populateCurrentAddress({...updated})
      return updated
    default:
      return updated
  }
}

export const populateCurrentAddress = (history) => {
  const items = (((history || {}).Residence || {}).List || {}).items || []
  if (items.length === 0) {
    return history
  }

  let found = false
  for (let r of items) {
    if (!r.Item) {
      continue
    }
    if (!r.Item.Address || !r.Item.Dates) {
      continue
    }
    if (r.Item.Dates.present) {
      // We have an address with a present date
      history.CurrentAddress = {...r.Item.Address}
      found = true
    }
  }

  if (!found) {
    history.CurrentAddress = null
  }
  return history
}

export default history
