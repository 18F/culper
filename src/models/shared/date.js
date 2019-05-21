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

        if (earliest) constraints.earliest = earliest
        if (latest) constraints.latest = latest

        return constraints
      }

      return true
    },
  },
}

export default date
