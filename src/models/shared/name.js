import suffixOptions from 'constants/enums/nameSuffixOptions'

const name = {
  first: {
    presence: { allowEmpty: false },
    length: (value, attributes) => {
      if (attributes.firstInitialOnly) {
        return { is: 1 }
      }

      return { minimum: 2, maximum: 100 }
    },
  },
  firstInitialOnly: {},
  last: {
    presence: { allowEmpty: false },
    length: { maximum: 100 },
  },
  middleInitialOnly: {},
  noMiddleName: {},
  hideMiddleName: {}, // TODO
  middle: (value, attributes) => {
    if (attributes.noMiddleName) {
      return { presence: false }
    }

    if (attributes.middleInitialOnly) {
      return {
        presence: { allowEmpty: false },
        length: { is: 1 },
      }
    }

    return {
      presence: { allowEmpty: false },
      length: { minimum: 2, maximum: 100 },
    }
  },
  suffix: {
    inclusion: suffixOptions,
  },
  suffixOther: (value, attributes) => {
    if (attributes.suffix === 'Other') {
      return { presence: { allowEmpty: false } }
    }

    return {}
  },
}

export default name
