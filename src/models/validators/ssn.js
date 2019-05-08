const ssnValidator = (value) => {
  // Legacy system only excluded explicit values
  const invalidSSNs = [
    '999-99-9999',
    '123-45-6789',
  ]

  if (invalidSSNs.indexOf(value) > -1) return 'Invalid SSN'

  return null
}

export default ssnValidator
