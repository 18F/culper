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
  middle: (value, attributes = {}) => {
    if (attributes.hideMiddleName || attributes.noMiddleName) {
      return { requireEmpty: true }
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
