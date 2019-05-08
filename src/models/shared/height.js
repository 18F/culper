const height = {
  feet: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 1,
    },
  },
  inches: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 11,
    },
  },
}

export default height
