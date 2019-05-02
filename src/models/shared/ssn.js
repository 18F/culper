const ssn = {
  ssn: {
    presence: { allowEmpty: false },
    ssn: true,
  },
  first: {
    presence: { allowEmpty: false },
    format: { pattern: /^\d{3}$/ },
  },
  middle: {
    presence: { allowEmpty: false },
    format: { pattern: /^\d{2}$/ },
  },
  last: {
    presence: { allowEmpty: false },
    format: { pattern: /^\d{4}$/ },
  },
}

export default ssn
