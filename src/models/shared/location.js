import { usStatesValues } from 'constants/enums/usStates'
import { usTerritoriesValues } from 'constants/enums/usTerritories'
import { militaryStatesValues } from 'constants/enums/militaryStates'

const location = {
  street: {
    presence: { allowEmpty: false },
  },
  city: (value, attributes = {}) => {
    if (attributes.country === 'POSTOFFICE') {
      return {
        inclusion: ['APO', 'FPO', 'DPO'],
      }
    }

    return { presence: { allowEmpty: false } }
  },
  state: (value, attributes = {}) => {
    console.log('validate state', attributes.country)

    if (attributes.country === 'POSTOFFICE') {
      return {
        presence: { allowEmpty: false },
        inclusion: militaryStatesValues,
      }
    }

    if (attributes.country === 'United States') {
      return {
        presence: { allowEmpty: false },
        inclusion: [...usStatesValues, ...usTerritoriesValues],
      }
    }

    return {}
  },
  zipcode: {
    presence: { allowEmpty: false },
    format: {
      pattern: /\d{5}(-\d{4})?/,
    },
    // TODO - validZipcodeState
  },
  country: { presence: { allowEmpty: false } },
  county: { presence: { allowEmpty: false } },
}

export default location
