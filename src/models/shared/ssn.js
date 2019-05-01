const ssn = {
  verified: (value, attributes) => {
    if (attributes.ssn && attributes.ssn.notApplicable === true) return {}
    return { requireTrue: true }
  },
  ssn: (value) => {
    if (value && value.notApplicable === true) return {}

    return {
      presence: { allowEmpty: false },
      ssn: true,
    }
  },
  'ssn.notApplicable': {},
  'ssn.first': (value, attributes) => {
    if (attributes.ssn && attributes.ssn.notApplicable === true) return {}

    return {
      presence: { allowEmpty: false },
      format: { pattern: /^\d{3}$/ },
    }
  },
  'ssn.middle': (value, attributes) => {
    if (attributes.ssn && attributes.ssn.notApplicable === true) return {}

    return {
      presence: { allowEmpty: false },
      format: { pattern: /^\d{2}$/ },
    }
  },
  'ssn.last': (value, attributes) => {
    if (attributes.ssn && attributes.ssn.notApplicable === true) return {}

    return {
      presence: { allowEmpty: false },
      format: { pattern: /^\d{4}$/ },
    }
  },
}

export default ssn
