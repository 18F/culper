const weight = {
  value: {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 10,
      lessThanOrEqualTo: 999,
    },
  },
}

export default weight
