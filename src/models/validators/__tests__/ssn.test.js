import ssn from '../ssn'

describe('The ssn validator', () => {
  it('fails an SSN with the value of 999-99-9999', () => {
    const testData = {
      first: '999',
      middle: '99',
      last: '9999',
    }

    expect(ssn(testData)).toEqual('INVALID_SSN')
  })

  it('fails an SSN with the value of 123-45-6789', () => {
    const testData = {
      first: '123',
      middle: '45',
      last: '6789',
    }

    expect(ssn(testData)).toEqual('INVALID_SSN')
  })

  it('fails if any SSN attributes are missing', () => {
    const testData = {
      first: '123',
    }

    expect(ssn(testData)).toEqual([
      'middle.presence.REQUIRED',
      'last.presence.REQUIRED',
    ])
  })

  it('passes if the ssn is not applicable', () => {
    const testData = {
      notApplicable: true,
    }

    expect(ssn(testData)).toBeNull()
  })

  it('passes a valid SSN', () => {
    const testData = {
      first: '301',
      middle: '24',
      last: '5391',
    }

    expect(ssn(testData)).toBeNull()
  })
})
