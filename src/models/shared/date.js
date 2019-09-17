import { DateTime, Duration } from 'luxon'

const date = {
  day: (value, attributes, attributeName, options) => (
    options && options.requireDay
      ? { presence: true }
      : {}
  ),
  month: (value, attributes, attributeName, options) => (
    options && options.requireMonth
      ? { presence: true }
      : {}
  ),
  year: (value, attributes, attributeName, options) => (
    options && options.requireYear
      ? { presence: true }
      : {}
  ),
  date: {
    presence: true,
    datetime: (value, attributes, attributeName, options) => {

      if (options && (options.earliest || options.latest)) {
        const { earliest, latest } = options
        const constraints = {}

        if (options.confirmed) {
          //special case for birthdates, only return the max age constraint
          if (value.name === "birthdate") {
            if (earliest) constraints.earliest = earliest

            return constraints
          }

          return true
        }
        else {
          if (earliest) constraints.earliest = earliest
          if (latest) constraints.latest = latest

          return constraints
        }
      }

      return true
    },
  },
}

export default date
