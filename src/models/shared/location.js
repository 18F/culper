import { usStatesValues } from 'constants/enums/usStates'
import { usTerritoriesValues } from 'constants/enums/usTerritories'
import { militaryStatesValues } from 'constants/enums/militaryStates'
import postOfficeCities from 'constants/enums/postOfficeCities'

import { isPO, isUS } from 'helpers/location'
import { zipCodePattern } from 'constants/patterns'

const location = {
  street: { presence: true },
  city: (value, attributes = {}) => {
    if (isPO(attributes)) {
      return {
        presence: true,
        inclusion: postOfficeCities,
      }
    }

    return { presence: true }
  },
  state: (value, attributes = {}) => {
    console.log('validate state', attributes)

    if (isPO(attributes)) {
      return {
        presence: true,
        inclusion: militaryStatesValues,
      }
    }

    if (isUS(attributes)) {
      return {
        presence: true,
        inclusion: [...usStatesValues, ...usTerritoriesValues],
      }
    }

    return { requireEmpty: true }
  },
  zipcode: {
    presence: true,
    format: {
      pattern: zipCodePattern,
    },
    // TODO - validZipcodeState
  },
  country: { presence: true },
  county: { presence: true },
}

export default location
