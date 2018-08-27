const relationships = function(state = {}, action) {
  if (action.section !== 'Relationships') {
    return state
  }
  // copy current state
  let updated = { ...state }

  // Override all values for the particular reducer key
  updated[action.property] = action.values

  switch (action.type) {
    case 'Relationships.ClearSameSpouseConfirmed':
      updated = clearCohabitantsSameSpouseConfirmed({ ...updated })
      return updated
    default:
      return updated
  }
}

/**
 * Clears the SameSpouseConfirmed flag that is set on cohabitants.
 */
export const clearCohabitantsSameSpouseConfirmed = (relationships = {}) => {
  if (!relationships.Cohabitants) {
    return relationships
  }

  const cohabitants = relationships.Cohabitants.CohabitantList
  if (!cohabitants || !cohabitants.length) {
    return relationships
  }

  const cohabitantList = cohabitants.map(c => {
    if (!c.Cohabitant) {
      return c
    }
    c.Cohabitant.SameSpouseConfirmed = false
    return c
  })

  relationships.Cohabitants['CohabitantList'] = cohabitantList
  return relationships
}

export default relationships
