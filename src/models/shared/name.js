import { namePattern } from 'constants/patterns'
import suffixOptions from 'constants/enums/nameSuffixOptions'

const name = {
  first: {
    presence: true,
    format: namePattern,
    length: (value, attributes = {}) => {
      if (attributes.firstInitialOnly) {
        return { is: 1 }
      }

      return { minimum: 2, maximum: 100 }
    },
  },
  firstInitialOnly: {},
  last: {
    format: namePattern,
    presence: true,
    length: { maximum: 100 },
  },
  middleInitialOnly: {},
  noMiddleName: {},
  hideMiddleName: {},
  middle: (value, attributes = {}, attributeName, options = {}) => {
    if (options.hideMiddleName || attributes.hideMiddleName || attributes.noMiddleName) {
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
    }

    if (attributes.middleInitialOnly) {
      return {
        presence: true,
        length: { is: 1 },
        format: namePattern,
      }
    }

    return {
      presence: true,
      length: { minimum: 2, maximum: 100 },
      format: namePattern,
    }
  },
  suffix: {
    inclusion: suffixOptions,
  },
  suffixOther: (value, attributes = {}) => {
    if (attributes.suffix === 'Other') {
      return { presence: true }
    }

    return {}
  },
}

export default name
