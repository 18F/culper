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

    return {}

    /**
     * The requireEmpty constraint was added to force certain fields to have no
     * value based on certain conditions. However, this broke some test data
     * since currently some data structures retain dead/unused data when values
     * are changed. For now all validation constraints are ignored for
     * irrelevant values, but this can be added back in the future.
     * See JIRA issue [EN-3928]
     * */
    // return { requireEmpty: true }
  },
  zipcode: (value, attributes = {}) => {
    if (!isInternational(attributes)) {
      return {
        presence: true,
        format: { pattern: zipCodePattern },
        zipcode: true, // zipcode + state validator
      }
    }

    return {}

    /**
     * The requireEmpty constraint was added to force certain fields to have no
     * value based on certain conditions. However, this broke some test data
     * since currently some data structures retain dead/unused data when values
     * are changed. For now all validation constraints are ignored for
     * irrelevant values, but this can be added back in the future.
     * See JIRA issue [EN-3928]
     * */
    // return { requireEmpty: true }
  },
  country: (value, attributes, attributeName, options) => {
    if (options.militaryAddress === true) {
      return {
        presence: true,
        inclusion: ['POSTOFFICE'],
      }
    }

    if (options.militaryAddress === false) {
      return {
        presence: true,
        exclusion: ['POSTOFFICE'],
      }
    }

    return { presence: true }
  },
  county: (value, attributes = {}) => {
    if (!isInternational(attributes)) {
      return { presence: true }
    }

    return {}

    /**
     * The requireEmpty constraint was added to force certain fields to have no
     * value based on certain conditions. However, this broke some test data
     * since currently some data structures retain dead/unused data when values
     * are changed. For now all validation constraints are ignored for
     * irrelevant values, but this can be added back in the future.
     * See JIRA issue [EN-3928]
     * */
    // return { requireEmpty: true }
  },
}

export default location
