import ssn from '../ssn'

describe('The ssn validator', () => {
  it('fails an SSN with the value of 999-99-9999', () => {
    expect(ssn('999-99-9999')).toBeTruthy()
  })

  it('fails an SSN with the value of 123-45-6789', () => {
    expect(ssn('123-45-6789')).toBeTruthy()
  })

  it('passes a valid SSN', () => {
    expect(ssn('301-24-5391')).toBe(null)
  })
})
