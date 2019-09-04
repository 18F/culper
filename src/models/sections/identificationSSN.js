const identificationSSN = {
  ssn: {
    presence: true,
    ssn: true,
  },
  verified: (value, attributes) => {
    const { ssn } = attributes
    if (ssn && ssn.notApplicable) return {}
    return {
      presence: true,
      requireTrue: true,
    }
  },
}

export default identificationSSN
