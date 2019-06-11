import { usStatesValues } from 'constants/enums/usStates'
import { usTerritoriesValues } from 'constants/enums/usTerritories'
import { militaryStatesValues } from 'constants/enums/militaryStates'
import postOfficeCities from 'constants/enums/postOfficeCities'

import { isPO, isUS, isInternational } from 'helpers/location'
import { zipCodePattern, notPOBoxPattern } from 'constants/patterns'

const location = {
  street: (value, attributes, attributeName, options) => {
    if (options.allowPOBox) {
      return { presence: true }
    }

    return {
      presence: true,
      format: { pattern: notPOBoxPattern },
    }
  },
  city: (value, attributes = {}) => {
    if (isPO(attributes)) {
      return {
        presence: true,
        inclusion: postOfficeCities,
      }
    }

    return {
      presence: true,
      length: {
        minimum: 2,
        maximum: 100,
      },
    }
  },
  state: (value, attributes = {}) => {
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
  zipcode: (value, attributes = {}) => {
    if (!isInternational(attributes)) {
      return {
        presence: true,
        format: { pattern: zipCodePattern },
        zipcode: true, // zipcode + state validator
      }
    }

    return { requireEmpty: true }
  },
  country: { presence: true },
  county: (value, attributes = {}) => {
    if (!isInternational(attributes)) {
      return { presence: true }
    }

    return { requireEmpty: true }
  },
}

export default location
