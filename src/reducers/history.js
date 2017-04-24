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
  if (!history.Residence || !history.Residence.length) {
    return history
  }

  for (let r of history.Residence) {
    if (!r.Item) {
      continue
    }
    if (!r.Item.Address || !r.Item.Dates) {
      continue
    }
    if (r.Item.Dates.present) {
      // We have an address with a present date
      history.CurrentAddress = {...r.Item.Address}
    }
  }
  return history
}

export default history
