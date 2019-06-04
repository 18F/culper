const ssn = {
  first: {
    presence: true,
    format: { pattern: /^\d{3}$/ },
  },
  middle: {
    presence: true,
    format: { pattern: /^\d{2}$/ },
  },
  last: {
    presence: true,
    format: { pattern: /^\d{4}$/ },
  },
}

export default ssn
